const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cluster = require('cluster');
const http = require('http');
const xss = require('xss-clean');
const dotenv = require('dotenv').config();

const routes = require('./routes/v1');

const server = express();

// server.use(helmet());

// sanitize request data
server.use(xss());

server.use(cors({  // reqexp will match all prefixes
    exposeHeaders: ["Set-Cookie"],  
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true,   // required to pass
    optionSuccessStatus:200,         
    allowedHeaders: "Access-Control-Allow-Origin, Content-Type, Access-Control-Allow-Credentials, Authorization"
}));

// Have Node serve the files for our built React app
server.use(express.static(path.resolve(__dirname, "./client/build")));

// Now we can tell the app to use our routing code.
server.use('/api/v1', routes);

// All other GET requests not handled before will return our React app
server.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  return console.log(`Race client server is listening at http://localhost:${port}`);
});

