const express = require('express');

const { awsController } = require('../../controllers');
// const { checkToken } = require('../../Helper');

const router = express.Router();

router
    .route('/get-users')
    .get( 
        awsController.getUsers
    );

router
    .route('/get-account-summary')
    .get( 
        awsController.getAccountSummary
    );


module.exports = router;