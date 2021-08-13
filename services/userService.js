const { User } = require('../models')
const bcrypt = require('bcrypt');
require('dotenv').config()


const createUser = async (data) => {
    return await User.create({
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
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