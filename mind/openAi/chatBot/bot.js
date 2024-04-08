import openai from '../conf.js';

const MAX_HISTORY = 100;

function addMessage(messageObj) {
  messages.push(messageObj);
  if (messages.length > MAX_HISTORY) messages.shift();
}

const messages = [{ role: 'system', content: 'You are helpful assistant' }];

export async function botMessaging({ message }) {
  addMessage({
    content: message,
    role: 'user',
    timestamp: new Date().toISOString(),
  });
  try {
    const completion = await openai.chat.completions.create({
      messages: messages.map(({ role, content }) => ({ role, content })),
      model: 'gpt-3.5-turbo',
    });

    const botMessage = completion.choices[0].message;
    addMessage({
      role: botMessage.role,
      content: botMessage.content,
      timestamp: new Date().toISOString(),
    });
    return messages;
  } catch (err) {
    throw err;
  }
}

export const generateImage = async ({ prompt }) => {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
