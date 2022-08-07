// Load the AWS SDK for Node.js
import dotenv from 'dotenv';
dotenv.config();

import AWS from 'aws-sdk';
import pkg from 'aws-sdk';
const { config, IAM } = pkg;

// import {} from 'dotenv/config';
// import pkg2 from 'dotenv';
// const { dotenv } = pkg2;
// dotenv.;

console.log("PROCESS VALUE: ", process.env.AWS_ACCESS_KEY);
console.log("PROCESS VALUE 2: ", process.env.AWS_SECRET_KEY);

const rootConfig = {
  // apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  accessSecretKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1"
}

// AWS.config.update(rootConfig);

AWS.config.loadFromPath('./config.json');
// Set the region 
// config.update(rootConfig);

// Create the IAM service object
var iam = new IAM({apiVersion: '2010-05-08'});

var params = {
  MaxItems: 20
};

iam.listUsers(params, function(err, data) {
  if (err) {
    console.log("Error::::::::::", err);
  } else {
      console.log("Data: ", data);
      var users = data.Users || [];
      // users.forEach(function(user) {
      //   console.log("User :" ,user);
      // });
  }
});