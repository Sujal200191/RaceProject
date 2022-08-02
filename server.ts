import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
// import dotenv from 'dotenv';
// import redis from 'redis';

// dotenv.config();

// import routes from './routes/v1';

// import Connection from './database';

const server = express();
const port = process.env.PORT || 3001;

// Have Node serve the files for our built React app
server.use(express.static(path.resolve(__dirname, '../client/build')));

server.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Handle GET requests to /api route
server.get('/api', (_req, res) => {
  res.json({ message: 'Hello from server!' });
});

// All other GET requests not handled before will return our React app
server.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  return console.log(`Race server is listening at http://localhost:${port}`);
});
