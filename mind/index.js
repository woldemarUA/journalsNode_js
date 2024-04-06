import { config } from 'dotenv';

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
// import { createServer } from 'node:http';

import chatRoutes from './routes/chatRoutes.js';
import io from './ws/wsServer.js';

config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
const server = createServer(app);

io.attach(server);
app.use(express.json());

app.use('/chat', chatRoutes);

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
