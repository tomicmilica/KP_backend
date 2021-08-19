const { Ad } = require('../models')
const { Op, sequelize, col, fn } = require('sequelize');
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
    let query = {};
    if (data.category) {
        query.category = data.category
    } if (data.search) {
        query.name = { [Op.like]: '%' + data.search + '%' }
    }
    if (data.price == 'max') {
        query.price = fn('max', col('price'))
        console.log(query.price)
    } if (data.price === 'min') {
        query.price = fn('min', col('price'))
    }
    return await Ad.findAll({ where: query });

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
        //   const updateAd = await Ad.findOne(data.id);
        return Ad.update(updateAd, { where: { id: data.id } });

    } catch (error) {
        return error;
    }
};


module.exports = { createAd, findAd, getAd, editAd }