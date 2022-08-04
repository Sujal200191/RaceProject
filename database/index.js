const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGO_ATLAS_URL 
    // `mongodb://localhost:27017/node-react-starter`
    ).then(() => { 
            /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
            console.log('SUCCESS! ESTABLISHED A SUCCESSFUL CONNECTION TO THE DATABASE');  
        },
        error => {
             /** handle initial connection error */ 
             console.log('ERROR! CANNOT ESTABLISH A SUCCESSFUL CONNECTION TO THE DATABASE DUE TO: ', error)
        }
    );
    
module.exports = mongoose.connection;