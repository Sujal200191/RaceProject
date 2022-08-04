const express = require('express');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');


const router = express.Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;