require('dotenv').config()
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
// const cryptr = new Cryptr(process.env.CRYPTR_KEY);
const cryptr = new Cryptr("myTotallySecretKey");

const adminToken = (data) => {
    return jwt.sign(data,process.env.SECRET_KEY);
}

const varifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

const encryptedPassword = (value) => {
    return cryptr.encrypt(value)
}

const decrypedPassword = (value) => {
    return cryptr.decrypt(value)
}

const generatedcategoryImageName = (image) => {
    return Math.floor(Math.random() * 10000) + new Date().getTime() + image;
};

module.exports = { generatedcategoryImageName, encryptedPassword, decrypedPassword, adminToken, varifyToken };