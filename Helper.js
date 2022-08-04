const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const axios = require('axios');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const addDays = require('date-fns/addDays');
const { request } = require('express');
const UAParser = require('ua-parser-js');

const redisClient  = require('./database/redis');

const secret = process.env.ACCESS_TOKEN_SECRET;

const targetURL = process.env.NODE_ENV === 'production' ? 'https://amngo-community-care.herokuapp.com' : 'http://localhost:8000';

async function checkUserTokenForAdminAccess(req, res, next){
    const header = req.headers['authorization'];
    try{
        if(typeof header !== 'undefined'){
            const bearer = header && header.split(' ')
            const token =  bearer[1];
            if(token != process.env.ADMIN_ACCESS_TOKEN){
                console.log('FORBIDDEN. Invalid token');
                res.status(403).send({ success : false, error: true, statusCode: 403, message : 'Forbidden' });    
            }else if(token === process.env.ADMIN_ACCESS_TOKEN){
                console.log("AUTHORIZED. You may proceed to access resource")
                next();
            }
        }else{
            console.log("FORBIDDEN. Please provide the required token to access the resource")
            res.status(403).send({ success : false, error: true, statusCode: 403, message : 'Forbidden' });   
        }
    }catch(error){
        console.log("Error encountered in checkUserTokenForAdminAccess() in Helper: ", error);
        logger.error(new Error(error))
        return res.status(400).send({ error: true, statusCode: 400, success: false, message: error.message })
    }
}

async function checkToken(req, res, next){
    // const header = req.headers['authorization'],
    const   dateNow = Date.now(),
            browserInfo = getBrowserDetails(req);
    const   IPAddress = req.socket.remoteAddress;
    console.log("REQUEST.HEADERS: ", req.headers);
    console.log("REQUEST.cookies: ", req.cookies && req.cookies);
    console.log("REQUEST AUTH: ", req.cookies['auth']);
    console.log("BrowserInfo: ", browserInfo);
    console.log("IP: ", IPAddress);
    try{
        if(!req.cookies || !req.cookies['auth']){
            // console.log('No Cookie received from client! FORBIDDEN');
            res.send({ success : false, error: true, statusCode: 403, message : 'No Cookie Token received. Forbidden' });
        }else if(req.cookies && req.cookies['auth'] !== 'undefined' || req.cookies['auth'] !== '' || req.cookies['auth'] !== null){
            console.log("Inside else if in checking token. Token exists but might have expired");
            //Perform necessary steps if token exists, based on its expiry
            const token =  req.cookies['auth'];
            const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // console.log("User: ", user);
            if(!user){
                console.log('Failed to verify JWT token. Redirect user to Login: ');
            }
            if(user && ((user.exp * 1000) > dateNow) && (((user.exp * 1000) - dateNow) > 60000)){
                console.log("Inside if to check if token expiry is > 1 MIN: ", user.exp, dateNow);
                req.token = token
            }else if(((user.exp * 1000) > dateNow ) && (((user.exp * 1000) - dateNow) < 60000)){
                console.log("Inside else if check if token expiry is < 1 MIN: ", user.exp, dateNow);
                const userId = user.userId
                const data = await redisClient.get(userId);
                console.log('Data received from redis client in if token expiry is < 1 MIN: ', data);
                const userData = JSON.parse(data);
                const responseToken = await getAccessUsingRefreshToken(userData);
                console.log('Response Token received in checkToken: ', responseToken);
                userData.token = responseToken;
                console.log('Data after attaching response token in if token expiry is < 1 MIN: ', userData);
                await redisClient.set(userId, JSON.stringify(userData));
                req.token = responseToken;
            }else if(!user || ((user.exp * 1000) < dateNow)){
                console.log("Inside sub else if 2: ", user.exp, dateNow);
                // console.log('TOKEN EXPIRED');
                logger.log(new Error(error))
                res.send({ success : false, error: true, statusCode: 403, message : 'Authentication failed' }); 
            }else{
                console.log("Inside sub else: ", user.exp, dateNow);
                // console.log('FORBIDDEN');
                res.send({ success : false, error: true, statusCode: 403, message : 'Forbidden' });
            }
            next();
        }
    }catch(error){
        console.log("Error encountered in checkToken() in Helper:", error);
        logger.error(new Error(error));
        if(error.name === 'TokenExpiredError'){
            return res.status(401).send({ error: true, statusCode: 401, success: false, message: error.message })
        }else{
            return res.status(400).send({ error: true, statusCode: 400, success: false, message: error })    
        }      
    }  
}        

async function getAccessUsingRefreshToken(payload){
    console.log("Payload in getAccessUsingRefreshToken() in Helper:", payload);
    return axios.post(`${targetURL}/api/v1/auth/token`, {
        payload
    }).then(
        response => response.data
    ).catch(err => {
        console.log('ERROR Encountered in getAccessUsingRefreshToken() in Helper: ', err)
        throw err;
    });
}

const generateAccessToken = (user) => {
  return jwt.sign(user, secret, { expiresIn: '60m' })
}

const generateRandomizedString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '',
        charactersLength = characters.length
        for (let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log("RANDOM STRING: ", result)
    return result;
}

const getStartDateAndEndDate = ( date ) => {
    // let current = new Date(),
    let start = startOfDay(date),                  // GET start of Day for current Date
        end = endOfDay(date)
    return [ start, end ] 
}

const userTypes = ['admin','casemanager', 'nurse'];

const getCookieOptions = (req) => {
    console.log("Browser details in getCookieOptions: ", getBrowserDetails(req));
    const   isHTTP = process.env.NODE_ENV === "production" ? true : false,
            // isSameSite = process.env.NODE_ENV === "production" ? "Strict" : "None",
            browserDetails = getBrowserDetails(req),
            // isCookieSecureProd = process.env.NODE_ENV === "production" ? true : false,
            isCookieSecureProd = process.env.NODE_ENV === "production" ? true : (browserDetails.browserName == ('Mobile Safari' || 'Chrome') ? false : true),
            // isCookieSecureProd = process.env.NODE_ENV === 'production' ? true : true;
            // isCookieSecureProd = process.env.NODE_ENV === "production" ? true : true,
            domain = process.env.NODE_ENV === "production" ? "https://community-care-amngo.herokuapp.com" : "http://localhost";
      
    console.log("DOMAIN: ", domain)
    console.log("IS COOKIE SECURE PROD:", isCookieSecureProd);
    // console.log("IS COOKIE SECURE DEV:", isCookieSecureDev);
    console.log('BrowserDetails: ', browserDetails);
      
    const options = {
        expires: new Date(new Date().getTime()+ 60 * 60 * 10000), 
        // secure: isCookieSecureDev,  uncomment this for local development
        secure : isCookieSecureProd, // uncomment this for prod deploy
        // secure: false,
        // httpOnly: isHTTP,   // uncomment this option for prod deploy
        // SameSite: isSameSite,   // uncomment this option for prod deploy
        sameSite: 'None',
        SameSite: 'None',
        // SameSite: 'Strict',
        // sameSite: 'Strict',
        // preflightContinue: true,      // uncomment this option for prod deploy
        // domain: "https://community-care-amngo.herokuapp.com",
        // domain: 'http://localhost',
        // domain: domain,
        withCredentials: true,
        methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        credentials: true,  // required to pass
        allowedHeaders: "Content-Type, Authorization, X-Requested-With"
    }    

    return options;
}

const getBrowserDetails = (req) => {
    const parser = new UAParser();
    const ua = req.headers['user-agent'];
    const browserName = parser.setUA(ua).getBrowser().name;
    const fullBrowserVersion = parser.setUA(ua).getBrowser().version;
    console.log("browserFullVersion: ", fullBrowserVersion);
    const browserVersion = fullBrowserVersion.split(".",1).toString();
    const browserVersionNumber = Number(browserVersion);
  
    const browserObject = {
        browserName: browserName,
        fullBrowserVersion: fullBrowserVersion,
        browserVersion: browserVersion
    }

    return browserObject;
    // if (browserName == 'IE' && browserVersion <= 9)
    //   res.redirect('/update/');
    // else if (browserName == 'Firefox' && browserVersion <= 24)
    //   res.redirect('/update/');
    // else if (browserName == 'Chrome' && browserVersion <= 29)
    //   res.redirect('/update/');
    // else if (browserName == 'Canary' && browserVersion <= 32)
    //   res.redirect('/update/');
    // else if (browserName == 'Safari' && browserVersion <= 5)
    //   res.redirect('/update/');
    // else if (browserName == 'Opera' && browserVersion <= 16)
    //   res.redirect('/update/');
    // else
    //   return next();
}

const  getPaginatedItems = (items, offset, itemsPerPage) => {
    const PER_PAGE = itemsPerPage;
    return items.slice(offset, offset + PER_PAGE);
}


module.exports = { 
    checkToken, 
    generateAccessToken, 
    userTypes,
    // postRefreshTokenToDatabase, 
    checkUserTokenForAdminAccess, 
    // checkRefreshTokenExistsInDatabase ,
    generateRandomizedString,
    getStartDateAndEndDate,
    getCookieOptions,
    getPaginatedItems
};