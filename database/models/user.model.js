const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const { generateRandomizedString } = require('../../Helper');

mongoose.promise = Promise;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    userName: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    organization: {
        type: String,
        required: true,
        unique: false
    },
    locked: {
        type: Boolean,
        required: false,
        default : false,
        unique: false
    },
    refreshTokens:[{
        type: String,
        default: generateRandomizedString(200),
        required: false,
        unique: true,
    }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next()
    }
});

// Define schema methods
userSchema.methods = {
    checkPassword: function (inputPassword) {
        const result = bcrypt.compareSync(inputPassword, this.password);
        return result;
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    },
    getSaltRounds: function(dataString){
        return bcrypt.getRounds(dataString);
    }
}

const User = mongoose.model('users', userSchema);

module.exports = { User, userSchema };