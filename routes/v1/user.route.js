const express = require('express');

const  authLocal  = require('../../database/passport');
const { 
    authController, 
    userController 
} = require('../../controllers');
const { 
    checkToken, 
    checkUserTokenForAdminAccess 
}  = require('../../Helper');

const router = express.Router({mergeParams : true});

router
    .route('/')
    .get(checkUserTokenForAdminAccess, userController.getAllUsers);

router
    .route('/register')
    .post(authController.register);

router
    .route('/:id')
    .get(checkToken, userController.getUser)
    .put(checkToken, userController.updateUser)
    .delete(checkToken, userController.deleteUser);    

router
    .route('/login')
    .post(authLocal, authController.login);

router
    .route('/logout')
    .post(checkToken, authController.logout);

module.exports = router;