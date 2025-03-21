import deepai from 'deepai';

deepai.setApiKey(process.env.DEEPAI_KEY!);

export const generateImage = async (prompt: string) => {
  const response = await deepai.callStandardApi('text2img', { text:prompt });
  return response.output_url;
};