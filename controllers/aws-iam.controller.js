const { awsService } = require('../services');
const axios = require('axios');
const AWS = require('aws-sdk');

const { config, IAM } = AWS;

const getUsers = (req, res, next) => {
    // AWS.config.loadFromPath('./config.json');
    const iam = new IAM({
        apiVersion: '2010-05-08',
        'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
        'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
    });

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

const getGroups = (req, res, next) => {
    // AWS.config.loadFromPath('./config.json');
    const iam = new IAM({
        apiVersion: '2010-05-08',
        'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
        'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
        MaxItems: 20
    };

    iam.listGroups(params, function(error, data) {
        if (error) {
            // eslint-disable-next-line no-console
            console.log("Error:", error);
        } else {
            // eslint-disable-next-line no-console
            console.log("Data: ", data);
            var groups = data.Groups || [];
            res.send(groups);
        }
    });
}

const getAccountSummary = (req, res, next) => {
    // AWS.config.loadFromPath('./config.json');
    const iam = new IAM({
        apiVersion: '2010-05-08',
        'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
        'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
    });

    iam.getAccountSummary({}, function(error, data) {
        if(error){
            // eslint-disable-next-line no-console
            console.log("Error encountered while fetchin getAccountSummary", error);
        }else{
            // eslint-disable-next-line no-console
            console.log("Data: ", data);
            // var users = data.Users || [];
            res.send(data.SummaryMap);
        }
    });
}

module.exports = {
    getUsers,
    getAccountSummary,
    getGroups
}