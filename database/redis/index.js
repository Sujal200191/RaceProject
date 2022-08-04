const redis = require('redis');
const asyncRedis = require("async-redis"); 

const options= {
    host: "127.0.0.1",
    post: 8200
}

let redisClient;

if(process.env.NODE_ENV === 'production' || process.env.REDISCLOUD_URL){
    console.log("Connecting to redis in production environment: ");
    redisClient = asyncRedis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true})
    redisClient.on("connect", function () {
        console.log("REDIS SUCCESSFULLY PLUGGED IN");
    });
}else{
    console.log("Connecting to redis in development environment:");
    redisClient  = asyncRedis.createClient(options);
}

redisClient.on("connect", function () {
    console.log("SUCCESS! ESTABLISHED A SUCCESSFUL CONNECTION TO REDIS CACHE");
});

module.exports = redisClient;