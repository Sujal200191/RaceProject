import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

import routes from './routes/v1';

import connection from './database';

const server = express();

server.use(helmet());

// sanitize request data
server.use(xss());
server.use(mongoSanitize());

server.use(cors({  // reqexp will match all prefixes
  exposeHeaders: ["Set-Cookie"],  
  origin: originURL,
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true,                // required to pass
  allowedHeaders: "Access-Control-Allow-Origin, Content-Type, Access-Control-Allow-Credentials, Authorization"
}));

// Check if the environment is PROD or DEV
const isProduction = process.env.NODE_ENV === 'production';
// Have Node serve the files for our built React app
server.use(express.static(path.resolve(__dirname, '../client/build')));

server.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Handle GET requests to /api route
// server.get('/api', (_req, res) => {
//   res.json({ message: 'Hello from server!' });
// });

// Now we can tell the app to use our routing code.
server.use('/api/v1', routes);

// All other GET requests not handled before will return our React app
server.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  return console.log(`Race server is listening at http://localhost:${port}`);
});
