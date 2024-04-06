import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API,
  dangerouslyAllowBrowser: true,
});

export default openai;
