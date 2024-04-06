import { Server } from 'socket.io';

import { botMessaging } from '../openAi/chatBot/bot';

const io = new Server({
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
  socket.on('greeting', ({ message }) => {
    // const message = response.message;
    // console.log(response.message);
    socket.emit('responseGreeting', message);
  });
});

export default io;
