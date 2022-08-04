const { authService, userService } = require('../services');
const redisClient = require('../database/redis');
const jwt = require('jsonwebtoken');

const { 
    generateAccessToken,  
    getCookieOptions
} = require('../Helper');


/**
 * Register user
 * 
 * @version 1.0.0
 * @throws 400 status
 * @author Rutul Amin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description takes user details from the user and return user and token with 201 status code
 *  if valid else return error with 400 status code or 409 for conflict
 * @summary User Registration
 */

async function register(req, res){
    let userServiceResponse;
    try{
        // Use the userService to register user with userBody.
        userServiceResponse = await userService.register(req.body);

        // If userService returns response containing `user` data       
        if(userServiceResponse.user){
            // 1. Create custom response to send to UI 
            const userPayload = {
                userName: userServiceResponse.user.username,
                userId: userServiceResponse.user._id,
                userRole: userServiceResponse.user.userrole
            }

            // 2. Generate new refeshToken and attach to user
            const refreshToken = authService.generateRefreshToken(userPayload);
            userServiceResponse.user.refreshTokens = refreshToken;

            // 3. Use save function as in user model to save user data
            await userServiceResponse.user.save();
            
            // 4. Return user payload
            return res.status(201).send(userPayload);
        }else{
            //No user data received then send the custom message received from userService.
            return res.status(userServiceResponse.statusCode).send(userServiceResponse.message);
        }  
    }catch(error){
        return res.status(userServiceResponse.statusCode).send(error);
    }
}

/**
  * Login
  * 
  * @version 1.0.0
  * @throws 400 status
  * @author Rutul Amin
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
  * @description takes username and password from the user and returns user info with accesstoken & refreshtoken with 200 status code
  *  if valid else return error with 400 status code
  * @summary User Login
*/

async function login(req, res){
    const userPayload = {
        userName: req.user.userName,
        userId: req.user.userId,
        userRole: req.user.userRole
    }

    console.log("userPayload in login in auth.controller: ", userPayload);
    
    const token = generateAccessToken(userPayload);
    const refreshToken = authService.generateRefreshToken(userPayload);
    const userId = userPayload.userId;

    // Attach the access token and refresh token to th userPayload object
    userPayload.token = token;
    userPayload.refreshToken = refreshToken;
    
    // Post the refresh token to database.
    await userService.postRefreshTokenToDB(userPayload);

    // Set the user payload object to redis client cache
    await redisClient.set(userId, JSON.stringify(userPayload));

    // Get data from redis client.
    const data = await redisClient.get(userId);

    // Get options for setting the cookie.
    const options = getCookieOptions(req); 
    
    res.status(res.statusCode)
        .cookie('auth', token, options) 
        .send(JSON.parse(data));
}

/**
  * CheckUser 
  * 
  * @version 1.0.0
  * @throws 403 status
  * @author Rutul Amin
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
  * @description takes access token from the cookie and returns user info with accesstoken & refreshtoken with 200 status code
  *  if valid else return error with 400 status code
  * @summary Check User session exists
*/

async function checkUser(req, res, next){
    // console.log('REQUEST TOKEN in checkUser() in auth.controller: ', req.token);
    const accessToken = req.token;
    try{
        const user = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (user) {
            req.user = user;
            console.log('SUCCESSFULLY connected to PROTECTED ROUTE', user);
            res.status(res.statusCode).send( user ) 
        }else{
            console.log('ERROR ENCOUNTERED while connecting to PROTECTED ROUTE', {}); // Need to figure out appropriate response to send
            res.status(res.status(403).send({error}));
        }
        next();
    }catch(error){
        // If error send Forbidden (403)
        // return next(new Error('This is an error and it should be logged to the console'));
        return{
            error: true,
            statusCode: 401,
            error
        }
    }
}

async function refreshExpiredToken(req, res){
    let refreshToken, refreshTokens = [];
    // console.log('REQUEST BODY in refreshExpiredToken() in auth.Controller: ', req.body);
    refreshToken = req.body.payload.refreshToken;
    if (refreshToken == null) {
        return res.sendStatus(401)
    }

    //Check if refresh token exists in user data in db
    const checkRefreshTokenExists = await authService.checkRefreshTokenExistsInDatabase(req.body.payload.userId);
    // console.log('CheckRefreshTokenExists in refreshExpiredToken: ', checkRefreshTokenExists);
    refreshTokens = checkRefreshTokenExists.refreshTokens;
    
    // if(!checkRefreshTokenExists) return res.sendStatus(403)
    if (!refreshTokens.includes(refreshToken)){
        return res.sendStatus(403);
    } 
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userData) => {
        let userId = userData.user.userId,
            username = userData.user.username,
            accessToken;
        if (err) {
            return res.sendStatus(403)
        }

        const payload = {
          username: username,
          userId: userId
        }
        accessToken = generateAccessToken(payload)
        redisClient.set(userId, JSON.stringify({
            userId: userId,
            username: username,
            accessToken: accessToken,
            refreshToken: refreshToken
        }));
        console.log('ACCESS TOKEN in refreshExpiredToken in auth.controller: ', accessToken);
        res.json(accessToken)
    })
}

async function logout(req, res){
    res.clearCookie('auth');
    res.send({
        statusCode: 200,
        message: 'Logout Successful'
    });
}


module.exports = { 
    register, 
    login,
    logout,
    checkUser,
    refreshExpiredToken 
};