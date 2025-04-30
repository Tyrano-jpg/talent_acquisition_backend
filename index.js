import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import path, { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import getConfigs from './config/config.js';
import mongo_service from './database/mongo.service.js';
import authRouter from './routes/auth.routes.js';
import allDevelopmentRouter from './routes/Development/allDevelopment.routes.js';
import profileRouter from './routes/profile.routes.js';
import rolesRouter from './routes/roles.routes.js';
import usersRouter from './routes/users.routes.js';
import { globalErrorHandler } from './utils/errors/GlobalErrorHandler.js';
import { checkServerHealth } from './controllers/auth.js';
// import { start_worker_thread } from './utils/constants.js';
// import { insert_raw_machine_data_into_machine_mismatch_model } from './utils/workers/workers.js';
// import { start_worker_thread } from './utils/constants.js';

const Configs = getConfigs();
mongo_service();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: Configs?.cors?.origin,
    methods: ['GET', 'POST'],
  },
});

const PORT = Configs.server.port;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json({ limit: 'Infinity' }));
app.use(express.urlencoded({ limit: 'Infinity', extended: true }));

global.config = {
  dirname: __dirname,
  filename: __filename,
};

//start worker thread for dressing missmatch data
// start_worker_thread();
// insert_raw_machine_data_into_machine_mismatch_model();

var corsOptions = {
  origin: Configs.cors.origin,
  optionsSuccessStatus: 200,
  credentials: Configs.cors.credentials,
};
app.use(cors(corsOptions));
app.use('/upload', express.static('./upload'));
app.use(express.static('./format'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(`/api/${Configs.server.version}/auth`, authRouter);
app.use(`/api/${Configs.server.version}/user`, usersRouter);
app.use(`/api/${Configs.server.version}/role`, rolesRouter);
app.use(`/api/${Configs.server.version}/profile`, profileRouter);
// app.use('/server-health', checkServerHealth);
//master
app.use(`/api/${Configs.server.version}/development`, allDevelopmentRouter);

//website

app.use(globalErrorHandler);

// Error handling for the server
server.on('error', (error) => {
  console.error(`Server error: ${error.message}`);
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
