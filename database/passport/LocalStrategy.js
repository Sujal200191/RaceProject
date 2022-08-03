import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import redis from 'redis';

import User from '../models';

const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	async function(username, password, done) {
        let userData;
            User.findOne({ username: username }, async(error, user) => {
                if (error) {
                    const error = new APIError('AUTHENTICATION ERROR', httpStatus.UNAUTHORIZED);
                    return done(error);
                }
                if (!user) {
                    logger.error(new Error(error));
                    return done({ 
                        error, 
                        success: false, 
                        statusCode: 400, 
                        message: 'THE PROVIDED USERNAME IS INCORRECT. PLEASE ENTER THE PROPER USERNAME' 
                    });
                }
                if(!user.checkPassword(password)){
                    logger.error(new Error(error));
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
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
                return done(null, userData);
            })     
	}
)

export default strategy;