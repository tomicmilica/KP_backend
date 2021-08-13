const express = require("express");
const app = require("../app");
const router = express.Router();
const userService = require('../services/userService')
const authService = require('../services/authService')
const jwt = require("jsonwebtoken");
require('dotenv').config()
const logger = require('../utils/logger')

router.post('/login', async (req, res, next) => {
    logger.info('login started ');
    try {
        const response = await authService.auhenticateUser(req.body)
        logger.info('user logged in');
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }
})


router.post("/register", async (req, res, next) => {
    logger.info('register started ');
    try {
        const response = await userService.createUser(req.body)
        logger.info('user registered');
        res.status(201).json(response)
    } catch (error) {
        next(error);
    }
})

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    const tokenBearer = token.split(' ')[1];
    console.log(tokenBearer);
    if (!tokenBearer) {
        res.send("You need a token")
    } else {
        jwt.verify(tokenBearer, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("User is not auth");
            } else {
                req.userId = user.userId;
                next();
            }
        })
    }

}

router.get('/user', verifyJWT, async (req, res, next) => {
    await res.status(200).json("User is auth");
})


router.post('/refresh', (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        res.send("You need a refresh token")
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json("User is not auth REFRESH");
        } else {
            const acces_token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: parseInt(process.env.JWT_EXPIRE) }
            );
            return res.status(201).json({ acces_token });
        }
    })
})
module.exports = router;