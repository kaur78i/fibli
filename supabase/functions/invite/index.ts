// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
// Import Supabase client at the top level
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.29.0';

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  // Get code from URL query parameters
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  console.log("code", code)
  // Get Supabase client - moved the import to the top of the file
  const supabaseClient = Deno.env.get('SUPABASE_URL') 
    ? createClient(
        Deno.env.get('SUPABASE_URL') || '',
        Deno.env.get('SUPABASE_ANON_KEY') || '',
        { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
      )
    : null;
  
  let data = {}
  
  // Check if we have a client and a code
  if (supabaseClient && code) {
    try {
      // Query the story_gists table using the provided code
      const { data: storyData, error } = await supabaseClient
        .from('story_gists')
        .update({
          inviting: true
        })
        .eq('id', code)
        .select()
        .single();
      
      if (error) throw error;
      
      data = {
        success: true,
        story: storyData
      }
    } catch (error) {
      data = {
        success: false,
        error: error.message
      }
    }
  } else {
    data = {
      success: false,
      message: "Missing Supabase client or code parameter"
    }
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/invite' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
