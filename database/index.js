import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.Promise = global.Promise;

console.log("process.env.MONGO_ATLAS_URL:::::", process.env.MONGO_ATLAS_URL);

const connection = async() => {
    mongoose.connect(
    process.env.MONGO_ATLAS_URL,
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
}
    
module.exports = connection;