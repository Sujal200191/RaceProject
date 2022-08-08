const express = require('express');

// const authRoute = require('./auth.route');
// const userRoute = require('./user.route');
const awsRoute = require('./aws-iam.route');

const router = express.Router();

// router.use('/users', userRoute);
// router.use('/auth', authRoute);
router.use('/aws-iam', awsRoute);

module.exports = router;