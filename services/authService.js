const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./userService')
require('dotenv').config()


const auhenticateUser = async (data) => {
    let user = await userService.getUserByUsername(data.username);

    if (!user) return Promise.reject(new Error(404, `Could not find user with e-mail ${data.username}!`));

    if (!bcrypt.compare(data.password, user.password))
        return response.json({ success: false, message: 'Passwords do not match' });

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: parseInt(process.env.JWT_EXPIRE) }
    );

    const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: parseInt(process.env.JWT_EXPIRE) }
    );
    return Promise.resolve({
        user: user,
        token: token,
        refreshToken: refreshToken
    });
}

module.exports = {
    auhenticateUser
}