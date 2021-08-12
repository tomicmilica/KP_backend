const express = require("express");
const app = require("../app");
const router = express.Router();
const adService = require('../services/adService')

router.post("/addNewAd", (req, res, next) => {
    adService.createAd(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err));
})

router.get('/findAd', (req, res, next) => {
    adService.findAd(req.query)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
})

router.get('/getAd/:id', (req, res, next) => {
    adService.getAd(req.param)
        .then(data => {
            logger.info('get ad by id');
            res.status(200).json(data)
        })
        .catch(err => next(err));
})

router.patch('/:id', (req, res, next) => {
    adService.editAd(req.param)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => next(err));
})

module.exports = router;