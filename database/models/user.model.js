import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const { generateRandomizedString } = require('../../Helper');

mongoose.promise = Promise

export const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: false
    },
    password: {
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
        next();
    }
    next();
});

userSchema.method('comparePassword', function (password) {
    if (bcrypt.compareSync(password, this.password)) return true;
    return false;
});

userSchema.static('hashPassword', (password) => {
    return bcrypt.hashSync(password);
});


export const User = mongoose.model('Users', userSchema);
