const express = require("express");
const app = require("../app");
const router = express.Router();
const adService = require('../services/adService')

router.post("/addNewAd",  (req, res, next) => {
    adService.createAd(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => next(err));
})

router.get('/getAds', (req, res, next) => {
    adService.getAds(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
})

module.exports = router;