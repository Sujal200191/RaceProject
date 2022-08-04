const express = require('express');

const { authController } = require('../../controllers');
const { checkToken } = require('../../Helper');

const router = express.Router();

router
    .route('/')
    .get(
        checkToken, 
        authController.checkUser
    );

router
    .route('/token')
    .post(
        authController.refreshExpiredToken
    );

module.exports = router;