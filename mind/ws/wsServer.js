import { Server } from 'socket.io';
import { createServer } from 'http';

import { botMessaging } from '../openAi/chatBot/bot.js';

const socketServer = createServer();

const io = new Server(socketServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'], //both client and server has to have the same if
    // client has Auhtorization, here it should be added also
    // credentials: true,
  },
  path: '/socket.io',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  upgradeTimeout: 20000,
  maxHttpBufferSize: 1e6,
  transports: ['polling', 'websocket'], // which transports to use, primary websockt if no -polling
  //   allowRequest: (req, callback) => {
  //     const isAuthorized = checkAuthorization(req);
  //     callback(null, isAuthorized);
  //   },
  cookie: 'io',
});

io.on('connection', (socket) => {
  socket.on('greeting', async (message) => {
    // const response = [
    //   {
    //     role: 'system',
    //     content: 'You are helpful assistant',
    //   },
    //   {
    //     content:
    //       'What is the value of 42 and what does that mean in Hitchhikers guide to the galaxy',
    //     role: 'user',
    //     timestamp: '2024-04-06T05:50:20.043Z',
    //   },
    //   {
    //     role: 'assistant',
    //     content:
    //       'In the Hitchhiker\'s Guide to the Galaxy by Douglas Adams, the value of 42 is famously referred to as the "Answer to the Ultimate Question of Life, the Universe, and Everything." In the story, a supercomputer named Deep Thought is asked to find the answer to this ultimate question, and after pondering it for millions of years, it comes up with the number 42. However, the characters in the story realize that they do not actually know what the ultimate question is, so the true meaning of 42 remains a mystery.',
    //     timestamp: '2024-04-06T05:50:22.331Z',
    //   },
    // ];

    const response = await botMessaging(message);

    response.shift();
    socket.emit('responseGreeting', response);
  });
});

// export default io;
export default socketServer;
