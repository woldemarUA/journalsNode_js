import { io } from 'socket.io-client';

const WS_PATH = process.env.REACT_APP_WS_URL;

console.log(WS_PATH);

const socket = io(WS_PATH, { path: '/socket.io' });

socket.on('connect', () => {
  console.log('Connected to server');

  // Emit the 'greeting' event to the server
  socket.emit('greeting');

  // Listen for the 'responseGreeting' event from the server
  socket.on('responseGreeting', (message) => {
    console.log('Received from server:', message);
    // Don't forget to close the connection once done
    socket.close();
  });
});
