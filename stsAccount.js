import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

const sts = new AWS.STS();
sts.getCallerIdentity({}, function(err, data) {
   if (err) {
      console.log("Error:::::::::::::", err);
   } else {
      console.log(JSON.stringify(data.Account));
   }
});