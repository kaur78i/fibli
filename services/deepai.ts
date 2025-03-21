

export const generateImage = async (prompt: string) => {
  const resp = await fetch('https://api.deepai.org/api/text2img', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.EXPO_PUBLIC_DEEPAI_KEY!
      },
      body: JSON.stringify({
          text: prompt,
          width: "1024",
          height: "768",
          genius_preference: 'anime',
          image_generator_version: 'hd'
      })
  });
  
  const data = await resp.json();
  return data.output_url;
}