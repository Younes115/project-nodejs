const mongoose = require('mongoose');
const validator = require('validator'); 
const UserRole = require('../uitlls/userRoles'); // Assuming you have a userRole.js file for user roles
const userSchema = new mongoose.Schema({
    firstName: { // Corrected field name
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    token: {
        type: String,
    },
    Role: {
        type: String,
        enum:[
            UserRole.ADMIN,
            UserRole.USER,
            UserRole.MANAGER
        ],
        default: UserRole.USER, 
    },
    avatar:{
        type: String,
        default: 'avatar.png',
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;