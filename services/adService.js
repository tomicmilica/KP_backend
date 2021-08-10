const { Ad } = require('../models')
const { fn, sequelize, col } = require('sequelize');
const { param } = require('../routes');

const createAd = async (data) => {
    return await Ad.create({
        name: data.name,
        description: data.description,
        url: data.url,
        price: data.price,
        category: data.category,
        city: data.city
    });
}

const findAd = async (data) => {

    if (data.category) {
        return await Ad.findAll({
            where: { category: data.category }

        })
    } else if (data.search) {
        return await Ad.findAll({
            where: { name: data.search }

        })
    }
    if (data.price) {
        return await Ad.findAll({
            where: { price: data.price }

        })
    }
    return await Ad.findAll(data);

}


const getAd = async (data) => {
    try {
        const ad = await Ad.findOne(data.id);
        return ad;
    } catch (error) {
        return error;
    }
};


const editAd = async (data) => {
    try {
        const updateAd = await Ad.findOne(data.id);
        return await Ad.update(updateAd, { where: { id: adId } });
    } catch (error) {
        return error;
    }
};


module.exports = { createAd, findAd, getAd, editAd }