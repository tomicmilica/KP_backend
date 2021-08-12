const { User } = require('../models')
const bcrypt = require('bcryptjs');
require('dotenv').config()


const createUser = async (data) => {
    console.log()
    return await User.create({
        username: data.username,
        password: bcrypt.hash(data.password, 20, (err, hash) => {
            hash.password
        }),
        dateOfRegistry: data.dateOfRegistry,
        phoneNumber: data.phoneNumber
    });
}

const getUserByUsername = async (username) => {
    return await User.findOne({
        where: {
            username: username
        }
    });
}

module.exports = { getUserByUsername, createUser }