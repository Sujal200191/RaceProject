const express = require('express');

const { awsController } = require('../../controllers');
// const { checkToken } = require('../../Helper');

const router = express.Router();

router
    .route('/')
    .get( 
        awsController.getAccountInfo
    );


module.exports = router;