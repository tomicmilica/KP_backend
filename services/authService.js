const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {ErrorHandler} = require('../utils/errorHandler');
const userService = require('./userService')
require('dotenv').config()


const auhenticateUser = async(data) => {
    let user = await userService.getUserByUsername(data.username);

    if (!user) return Promise.reject(new ErrorHandler(404, `Could not find user with e-mail ${data.username}!`));

    if (!bcrypt.compare(data.password, user.password))
         return response.json({success: false, message: 'Passwords do not match'});

    const token = createToken(user);
    return Promise.resolve({
        user: user,
        token: token
    });
}

const createToken = (user) => {
    return jwt.sign(
        {user},
        process.env.JWT_SECRET,
        {expiresIn: parseInt(process.env.JWT_EXPIRE)}
    );
}

module.exports = {
    auhenticateUser,
    createToken,
}