const { Ad } = require('../models')

const createAd = async (data) => {
    return await Ad.create({
        name: data.name,
        description: data.description,
        url: data.url,
        price: data.price,
        category : data.category,
        city : data.city
    });
}

const getAds=async(data)=>{
    return await Ad.findAll(data);
}

module.exports={createAd,getAds}