import express from 'express';

const chatRoutes = express.Router();

import { botMessaging, generateImage } from '../openAi/chatBot/bot.js';

chatRoutes.get('/message', async (req, res) => {
  res.status(200).json({ msg: req.body });
  //   try {
  //     const result = await message();
  //     res.status(400).json({ msg: result });
  //   } catch (err) {
  //     res.status(500).json({ msg: err.message || 'error occured' });
  //   }
});

chatRoutes.post('/message', async (req, res) => {
  try {
    const message = await botMessaging(req.body);
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message || 'erreur se produit' });
  }
});

chatRoutes.post('/image', async (req, res) => {
  try {
    const image = await generateImage(req.body);
    console.log('chatRoutes', image);
    res.status(200).json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      msg: err.message || 'erreur se produit',
    });
  }
});

// {
//     "msg": {
//     "index": 0,
//     "message": {
//     "role": "assistant",
//     "content": "Hello! How can I assist you today?"
//     },
//     "logprobs": null,
//     "finish_reason": "stop"
//     }
//     }

export default chatRoutes;
