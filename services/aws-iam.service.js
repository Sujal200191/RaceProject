
const { dotenv } = require('dotenv').config();

const pkg = require('aws-sdk');
const AWS = require('aws-sdk');
// import pkg from 'aws-sdk';
const { config, IAM } = pkg;

const rootConfig = {
    // apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1"
}

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     accessSecretKey: process.env.AWS_SECRET_KEY,
//     region: "us-east-1"
// })

// console.log("ROOTCONFIG: ", rootConfig);
// AWS.config.loadFromPath('config.json');
AWS.config.loadFromPath('./config.json');

// Create the IAM service object
var iam = new IAM({apiVersion: '2010-05-08'});

var params = {
  MaxItems: 20
};

const getAccountInfo = async () => {
    let response;
    
    response = iam.listUsers(params, function(err, data) {
        if (err) {
        console.log("Error::::::::::", err);
        } else {
            console.log("Data:::::::: ", data);
            var users = data.Users || [];
            // users.forEach(function(user) {
            //   console.log("User :" ,user);
            // });
            response = users;
            console.log('Response after setting:::: ', response);
            return response;
        }
    });
}

module.exports = { 
    getAccountInfo
}