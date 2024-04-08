import { config } from 'dotenv';

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import main from './llamaindex/llamaIndex.js';

import chatRoutes from './routes/chatRoutes.js';
// import io from './ws/wsServer.js';
import socketServer from './ws/wsServer.js';

config();

const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;

const app = express();
app.use(cors());
const server = createServer(app);

// io.attach(server);
app.use(express.json());

app.get('/llama', async (req, res) => {
  try {
    const response = await main();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message || 'erreur se produit' });
  }
});
app.use('/chat', chatRoutes);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
socketServer.listen(SOCKET_PORT, () =>
  console.log(`Socket server is running on port ${SOCKET_PORT}`)
);
