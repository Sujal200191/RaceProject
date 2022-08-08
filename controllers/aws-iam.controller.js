const { awsService } = require('../services');
const axios = require('axios');
const AWS = require('aws-sdk');

const { config, IAM } = AWS;

async function getAccountInfo(req, res, next){
    // AWS.config.loadFromPath('./config.json');
    const iam = new IAM({
        apiVersion: '2010-05-08',
        'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
        'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
    });

    // console.log("IAM: ", iam);

    const params = {
        MaxItems: 20
    };

    iam.listUsers(params, function(error, data) {
        if (error) {
            // eslint-disable-next-line no-console
            console.log("Error:", error);
        } else {
            // eslint-disable-next-line no-console
            console.log("Data: ", data);
            var users = data.Users || [];
            res.send(users);
        }
    });
}

module.exports = {
    getAccountInfo
}