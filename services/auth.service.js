const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../database/models');

const generateRefreshToken = (user) => {
    const key = process.env.REFRESH_TOKEN_SECRET || crypto.randomBytes(256).toString('hex');
    const refreshToken = jwt.sign({ user: user }, key);
    return refreshToken;
};

const checkRefreshTokenExistsInDatabase = async (userId ) => {
    console.log('User id received in checkRefreshTokenExistsInDatabase in auth.service: ', userId);
    try{
        const user = await User.findById(userId);
        // console.log('User received after fetch in checkRefreshTokenExistsInDatabase in auth.service: ', user);

        return user;
    }catch(error){
      return{
        error: true,
        statusCode: 500,
        error
      }  
    }
}

module.exports = { 
  generateRefreshToken,
  checkRefreshTokenExistsInDatabase
}