const express = require("express");
const app = require("../app");
const router = express.Router();
const userService = require('../services/userService')
const authService = require('../services/authService')

router.post('/login',(req, res, next) => {
        console.log(req.body)
        authService.auhenticateUser(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
})


router.post("/register",  (req, res, next) => {
    userService.createUser(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => next(err));
})

module.exports = router;

