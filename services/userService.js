const { User } = require('../models')

const createUser = async (data) => {
    return await User.create({
        username: data.username,
        password: data.password,
        dateOfRegistry: data.dateOfRegistry,
        phoneNumber: data.phoneNumber
    });
}

const getUserByUsername = async(username) => {
    return await User.findOne({
        where: {
            username: username
        }
    });
}

module.exports={getUserByUsername,createUser}