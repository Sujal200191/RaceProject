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
    .route('/get-groups')
    .get( 
        awsController.getGroups
    );

router
    .route('/get-policies')
    .get( 
        awsController.getPolicies
    );

router
    .route('/get-account-summary')
    .get( 
        awsController.getAccountSummary
    );

router
    .route('/get-password-policies')
    .get( 
        awsController.getAccountPasswordPolicies
    );

router
    .route('/get-account-auth-details')
    .get(
        awsController.getAccountAuthDetails
    );


module.exports = router;