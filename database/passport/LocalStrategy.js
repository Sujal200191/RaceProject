const mongoose = require('mongoose');
const redis = require('redis');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');
const bcrypt = require('bcrypt');



const getUsernameIPkey = (username, ip) => `${username}_${ip}`;


const strategy = new LocalStrategy(
	async function(username, password, done) {
        let userData;
            User.findOne({ username: username }, async(error, user) => {
                if (error) {
                    const error = new APIError('AUTHENTICATION ERROR', httpStatus.UNAUTHORIZED);
                    return done(error);
                }
                if (!user) {
                    return done({ 
                        error, 
                        success: false, 
                        statusCode: 400, 
                        message: 'THE PROVIDED USERNAME IS INCORRECT. PLEASE ENTER THE PROPER USERNAME' 
                    });
                }
                if(!user.checkPassword(password)){
                    return done({ 
                        error, 
                        success: false, 
                        statusCode: 400, 
                        message: 'THE PROVIDED PASSWORD IS INCORRECT. PLEASE ENTER THE CORRECT PASSWORD' 
                    });   
                }
                userData = {
                    userId : (user._id).toString(),
                    userName: user.username,
                    userRole: user.userrole,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
                return done(null, userData);
            })     
	}
);

module.exports = strategy