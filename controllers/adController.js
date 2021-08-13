const express = require("express");
const app = require("../app");
const router = express.Router();
const logger = require('../utils/logger')
const adService = require('../services/adService')

router.post("/addNewAd", async (req, res, next) => {
    try {
        const response = await adService.createAd(req.body);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
})

router.get('/findAd', async (req, res, next) => {
    try {
        const response = await adService.findAd(req.query);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})

router.get('/getAd/:id', async (req, res, next) => {
    try {
        logger.info('get ad by id');
        const response = await adService.getAd(req.param);
        console.log
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const response = adService.editAd(req.param)
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }

})

module.exports = router;