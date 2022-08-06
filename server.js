const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const redisClient  = require('./database/redis');
const cookieParser = require('cookie-parser');
const cluster = require('cluster');
const http = require('http');
const xss = require('xss-clean');
const dotenv = require('dotenv').config();

// dotenv.config();

const routes = require('./routes/v1');

const Connection = require('./database');

let originURL;

const server = express();

server.use(helmet());

server.use(function(req, res, next) {
    console.log("REQ -> body", req.body);
    console.log("req.headers[origin]: ", req.headers['origin']);
    
    if(req.headers['origin'] === process.env.PROD){
        originURL = process.env.PROD  
        // eslint-disable-next-line no-console
        console.log("PROD ORIGIN URL: ", originURL ,process.env.PROD, process.env.DEV)
    }else if(req.headers['origin'] === process.env.DEV){
        originURL = process.env.DEV
        // eslint-disable-next-line no-console
        console.log("DEV ORIGIN URL: ", originURL, process.env.PROD, process.env.DEV)
    }
    res.removeHeader('X-powered-by');
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('content-type', 'application/json');
    res.header("Access-Control-Allow-Origin", originURL);
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// sanitize request data
server.use(xss());

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
server.use(express.static(path.resolve(__dirname, "./client/build")));

// server.get("/", (_req, res) => {
//   res.send("Hello World!");
// });

// // Handle GET requests to /api route
// server.get("/api", (_req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// All other GET requests not handled before will return our React app
server.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Now we can tell the app to use our routing code.
server.use('/api/v1', routes);



const port = process.env.PORT || 3001;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  return console.log(`Race server is listening at http://localhost:${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const morgan = require('morgan');
// const cors = require('cors');
// const helmet = require('helmet');
// const redisClient  = require('./database/redis');
// const cookieParser = require('cookie-parser');
// const cluster = require('cluster');
// const http = require('http');
// const xss = require('xss-clean');
// const dotenv = require('dotenv').config();

// const routes = require('./routes/v1');


// //Database
// const Connection = require('./database');

// const isProduction = process.env.NODE_ENV === 'production';
// let originURL;

// const server = express();

// server.use(helmet());

// server.use(function(req, res, next) {
//     console.log("REQ -> body", req.body);
//     console.log("req.headers[origin]: ", req.headers['origin']);
    
//     if(req.headers['origin'] === process.env.PROD){
//         originURL = process.env.PROD  
//         console.log("PROD ORIGIN URL: ", originURL ,process.env.PROD, process.env.DEV)
//     }else if(req.headers['origin'] === process.env.DEV){
//         originURL = process.env.DEV
//         console.log("DEV ORIGIN URL: ", originURL, process.env.PROD, process.env.DEV)
//     }
//     res.removeHeader('X-powered-by');
//     res.header("Access-Control-Allow-Headers", "content-type");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     res.setHeader('content-type', 'application/json');
//     res.header("Access-Control-Allow-Origin", originURL);
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

// // sanitize request data
// server.use(xss());

// server.use(cors({  // reqexp will match all prefixes
//     exposeHeaders: ["Set-Cookie"],  
//     origin: originURL,
//     methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
//     credentials: true,                // required to pass
//     allowedHeaders: "Access-Control-Allow-Origin, Content-Type, Access-Control-Allow-Credentials, Authorization"
// }));


// server.use(cookieParser());

// server.use(bodyParser.urlencoded({
//   extended: true
// }))

// server.use(bodyParser.json());

// // Now we can tell the app to use our routing code.
// server.use('/api/v1', routes);

// console.log("__dirname", __dirname);

// // Have Node serve the files for our built React app
// server.use(express.static(path.resolve(__dirname, '../client/build')));

// // All other GET requests not handled before will return our React app
// server.get('*', (_req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });
// // server.get('/', (_req, res) => {
// //   res.send('Hello World!');
// // });

// // Handle GET requests to /api route
// // server.get('/api', (_req, res) => {
// //     res.json({ message: 'Hello from server!' });
// // });



// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(`NODE SERVER IS UP AND RUNNING ON PORT ${PORT}`);
// });

