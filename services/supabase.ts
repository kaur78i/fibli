import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TStory, TStoryGist, TChapter } from '@/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import base64 from 'base64-js';

// Initialize the Supabase client
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is not set');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const downloadAndSaveImage = async (imageBuffer: Uint8Array, fileName: string) => {
  try {
    // Convert Uint8Array to base64 string using base64-js
    const base64String = base64.fromByteArray(imageBuffer);
    // Create a fetch-compatible Blob from base64
    const response = await fetch(`data:image/webp;base64,${base64String}`);
    const blob = await response.blob();
    // Upload Blob to Supabase
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${fileName}`, blob, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error('Error uploading image to storage:', error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

// Background download function with retry logic
const downloadImageInBackground = async (imageUrl: string, fileName: string, retryCount = 0, maxRetries = 3): Promise<void> => {
  try {
    // First fetch the image using fetch API instead of axios
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    console.log('blob size:', blob.size);

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${fileName}`, blob, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error('Error uploading image to storage in background:', error);
      throw error; // Throw to trigger retry mechanism
    }

    // Get the public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path);

    const permanentUrl = publicUrlData.publicUrl;

    // Update the database records with the permanent URL
    await updateImageUrlInDatabase(imageUrl, permanentUrl);

  } catch (error) {
    console.error(`Error in background image processing (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);

    // Implement retry with exponential backoff
    if (retryCount < maxRetries) {
      const backoffTime = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
      console.log(`Retrying download in ${backoffTime}ms...`);

      setTimeout(() => {
        downloadImageInBackground(imageUrl, fileName, retryCount + 1, maxRetries);
      }, backoffTime);
    } else {
      console.error(`Failed to download image after ${maxRetries + 1} attempts:`, imageUrl);
    }
  }
};

// Function to update image URLs in database tables
const updateImageUrlInDatabase = async (temporaryUrl: string, permanentUrl: string): Promise<void> => {
  try {
    // 1. First, check and update story_gists table
    const { data: gistData, error: gistError } = await supabase
      .from('story_gists')
      .update({ image: permanentUrl })
      .eq('image', temporaryUrl)
      .select('id');

    if (gistError) {
      console.error('Error updating story_gists:', gistError);
    } else if (gistData && gistData.length > 0) {
      console.log('Updated image URL in story_gists for IDs:', gistData.map(item => item.id).join(', '));
    }

    // 2. Next, check and update the stories table
    const { data: storiesData, error: storiesError } = await supabase
      .from('stories')
      .update({ image: permanentUrl })
      .eq('image', temporaryUrl)
      .select('id');

    if (storiesError) {
      console.error('Error updating stories:', storiesError);
    } else if (storiesData && storiesData.length > 0) {
      console.log('Updated image URL in stories for IDs:', storiesData.map(item => item.id).join(', '));
    }

    // 3. Finally, update chapter images in stories table (most complex case)
    // Fetch all stories
    const { data: allStories, error: fetchError } = await supabase
      .from('stories')
      .select('id, chapters');

    if (fetchError) {
      console.error('Error fetching stories for chapter image update:', fetchError);
      return;
    }

    // Check each story for chapters with the temporary URL
    const storiesToUpdate = allStories?.filter(story => {
      if (!story.chapters || !Array.isArray(story.chapters)) return false;
      return story.chapters.some(chapter => chapter.image === temporaryUrl);
    });

    if (storiesToUpdate && storiesToUpdate.length > 0) {
      // Process each story that needs updating
      await Promise.all(storiesToUpdate.map(async (story) => {
        // Update chapters with the temporary URL
        const updatedChapters = story.chapters.map((chapter: TChapter) => {
          if (chapter.image === temporaryUrl) {
            return { ...chapter, image: permanentUrl };
          }
          return chapter;
        });

        // Update the story with the modified chapters
        const { error: updateError } = await supabase
          .from('stories')
          .update({ chapters: updatedChapters })
          .eq('id', story.id);

        if (updateError) {
          console.error(`Error updating chapters for story ${story.id}:`, updateError);
        } else {
          console.log(`Updated chapter images for story ${story.id}`);
        }
      }));
    }
  } catch (error) {
    console.error('Error in updateImageUrlInDatabase:', error);
  }
};

export const saveStoryGist = async (storyGist: TStoryGist) => {
  const { data, error } = await supabase
    .from('story_gists')
    .insert({
      title: storyGist.title,
      preview: storyGist.preview,
      image: storyGist.image,
      chapters: storyGist.chapters,
      user_id: storyGist.user_id,
      age_range: storyGist.age_range,
      length: storyGist.length,
      mood: storyGist.mood,
    })
    .select('id, image')
    .single();

  if (error) {
    console.error('Error saving story gist:', error);
    throw error;
  }

  return data;
};

export const saveStory = async ({ gist_id, ...story }: TStory & { gist_id: string }) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .insert({
        title: story.title,
        preview: story.preview,
        image: story.image,
        chapters: story.chapters,
        user_id: story.user_id,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving story:', error);
      throw error;
    }

    await supabase
      .from('story_gists')
      .update({
        story_id: data.id,
      })
      .eq('id', gist_id);

    return data;
  } catch (error) {
    console.error('Error saving story:', error);
    throw error;
  }
};

export const getStory = async (id: string) => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .order('created_at', { ascending: false })
    .single();

  if (error) {
    console.error('Error getting story:', error);
    throw error;
  }

  return data;
};

export const getGists = async (userId: string) => {
  const { data, error } = await supabase
    .from('story_gists')
    .select('*')
    .eq('user_id', userId)
    .not('story_id', 'is', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting gists:', error);
    throw error;
  }

  return data;
};

export const updateStory = async ({ id, title, chapters }: { id: string, title: string, chapters: TChapter[] }) => {
  const { data, error } = await supabase
    .from('stories')
    .update({ title, chapters })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating story:', error);
    throw error;
  }

  const { error: updateGistError } = await supabase
    .from('story_gists')
    .update({ title: title, isEdited: true })
    .eq('story_id', id);

  if (updateGistError) {
    console.error('Error updating gist:', updateGistError);
    throw updateGistError;
  }

  return data;
};

export const deleteStory = async (story_id: string) => {
  const { data: gistData, error } = await supabase
    .from('story_gists')
    .delete()
    .eq('story_id', story_id)
    .select('image')
    .single();

  console.log('gistData', gistData);
  if (error) {
    console.error('Error deleting story:', error);
    throw error;
  }

  const { data: storyData, error: deleteStoryError } = await supabase
    .from('stories')
    .delete()
    .eq('id', story_id)
    .select('chapters')
    .single();

  if (deleteStoryError) {
    console.error('Error deleting story:', deleteStoryError);
    throw deleteStoryError;
  }

  // Extract just the filename from the full URL
  const getFilenameFromUrl = (url: string): string => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const gistImagePath = getFilenameFromUrl(gistData?.image);
  if (gistImagePath) {
    await supabase.storage.from('images').remove([gistImagePath]);
  }

  if (storyData?.chapters) {
    await Promise.all(storyData.chapters.map(async (chapter: TChapter) => {
      const chapterImagePath = getFilenameFromUrl(chapter.image);
      if (chapterImagePath) {
        await supabase.storage.from('images').remove([chapterImagePath]);
      }
    }));
  }
};

export const getTitles = async (user_id: string) => {
  const { data, error } = await supabase
    .from('story_gists')
    .select('title')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting titles:', error);
    throw error;
  }

  return data;
};

export const getStoryByInviteCode = async (code: string) => {
  try {
    // Get the story gist using the story ID as the invite code
    const { data, error } = await supabase
      .from('story_gists')
      .select('*')
      .eq('id', code)
      .single();

    if (error) {
      console.error('Error getting story by invite code:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getStoryByInviteCode:', error);
    return null;
  }
};

export const addInvitedStory = async ({ gist_id, user_id }: { gist_id: string, user_id: string }) => {
  const { data, error } = await supabase
    .from('story_gists')
    .update({ inviting: true })
    .eq('id', gist_id)
    .select('*')
    .single();

  const { error: storyError } = await supabase
    .from('story_gists')
    .insert({
      user_id,
      title: data.title,
      preview: data.preview,
      image: data.image,
      chapters: data.chapters,
      age_range: data.age_range,
      length: data.length,
      mood: data.mood,
      story_id: data.story_id,  
      invited: true
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error adding invited story:', error);
    throw error;
  }

  if (storyError) {
    console.error('Error adding invited story:', storyError);
    throw storyError;
  }
};

export const removeGist = async (gist_id: string) => {
  const { error } = await supabase
    .from('story_gists')
    .delete()
    .eq('id', gist_id)
  
  if (error) {
    console.error('Error removing story gist:', error);
    throw error;
  }
}