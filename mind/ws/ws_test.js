import { io } from 'socket.io-client';

const socket = io(`http://localhost:3000`, {
  path: '/socket.io',
});
console.log('hello', socket);
// socket.on('connect', () => {
//   console.log('Connected to server');

//   // Emit the 'greeting' event to the server
//   socket.emit('greeting');

//   // Listen for the 'greetingBack' event from the server
//   socket.on('responseGreeting', (message) => {
//     console.log('Received from server:', message);
//     // Don't forget to close the connection once done
//     socket.close();
//   });
// });
