const mongoose = require('mongoose');

const { User, CaseManager, Apn } = require('../database/models');

const ObjectId = mongoose.Types.ObjectId;
/**
 * Create new user with `userBody`
 *
 * @function
 * @public
 * @async
 * @author Rutul Amin
 * @param {Object} userBody 
 * @summary Post user with `userBody`
 * @returns {Document} `user`
 */
const register = async (userBody) =>{
    // CREATE NEW USER
    const checkUser = await User.findOne({ username: userBody.username });
    if(checkUser && checkUser.username){
        return {
            error: true,
            statusCode: 409,
            message: 'A user already exists with provided username'
        }
    }else{
        const user = await User.create(userBody);
        return {
            error: false,
            statusCode: 201,
            message: 'User created successfully',
            user
      }
    } 
};

const postRefreshTokenToDB = async (payload) =>{
    try{
        let user = await User.findByIdAndUpdate(
            payload.userId, 
            { $push: { refreshTokens: [payload.refreshToken] }},
            { upsert: true, multi: false, new: true }
        );
        if(user){
          return user;
        }
    }catch(error){
        console.log("ERROR ENCOUNTERED IN insertToken() in UserService: ",error)
        return {
            error: true,
            statusCode: 500,
            message: error.errmsg || "UNABLE TO UPDATE USER",
            errors: error.errors
        };  
    }
}

/**
 * Get user with `userId`
 *
 * @function
 * @public
 * @async
 * @author Rutul Amin
 * @param {Object} userId - User Id to find with
 * @summary Get user with `userId`
 * @returns {Document} `user` with the given `userId`
 */

const getUser = async (userId) =>{
    try{
      let user = await User.findById(userId);
      if(user)
      // console.log("ITEM in getOne() in Service: ", item)
        return {
          error: false,
          statusCode: 200,
          data: user,
        };
    } catch(error){
        console.log("Error encountered in getOne() in Service: ", error)
        return{
          error: true,
          statusCode: 500,
          error
        }
    } 
}

/**
 * Get all user *
 * @function
 * @public
 * @async
 * @author Rutul Amin
 * @param {query} 
 * @summary Get all users
 * @returns {Document} An array of users
 */
const getAllUsers = async (query) => {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
        console.log("NOT ABLE TO GENERATE MONGOOSE ID WITH CONTENT: ", query._id);
      }
    }

    try {
      let users = await User.find(query).skip(skip);
        // .limit(limit); // Set this option to limit the number of documents that are returned.

      // console.log("ITEMS in getAll() in Service: ", users);
      let total = await User.countDocuments();

      return {
        error: false,
        statusCode: 200,
        data: users,
        total
      };
    } catch (errors) {
        return {
          error: true,
          statusCode: 500,
          errors
        };
    }
}

/**
 * Update user with `sessionId`
 *
 * @function
 * @public
 * @async
 * @author Rutul Amin
 * @param {ObjectId} userId - User Id to update with
 * @summary Update user with `userId`
 * @returns {Document} `user` with the provided `userId`
 */

const updateUser = async (id, data) => {
    try {
      let user = await User.findByIdAndUpdate(
          id, 
          data, 
          { new: true, upsert: true, save:true }
        );

      return {
        error: false,
        statusCode: 202,
        user
      };
    } catch (error) {
      console.log("Error encountered in updateUser() in user.service: ", error)
      return {
        error: true,
        statusCode: 500,
        error
      };
    }
}

/**
 * Delete user with `userId`
 *
 * @function
 * @public
 * @async
 * @author Rutul Amin
 * @param {ObjectId} userId - User Id to delete with
 * @summary Delete user with `userId`
 * @returns {null} 
 */

const deleteUser = async (id) =>{
    try {
      let user = await User.findByIdAndDelete(id);
      if (!user)
        return {
          error: true,
          statusCode: 404,
          message: "ITEM NOT FOUND"
        };

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        user
      };
    } catch (error) {
      console.log("Error encountered in deleteUser() in user.service:", error)
      return {
        error: true,
        statusCode: 500,
        error
      };
    }
  }


module.exports = { 
    register,
    postRefreshTokenToDB,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}