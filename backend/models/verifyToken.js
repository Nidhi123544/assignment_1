const responseMixin = require('../responseStatus')
const jwt = require('jsonwebtoken');
const config = require('../config');
const {fetchUserByApikey}= require('./userModel');


module.exports = async function (req, res, next) {
    try {
        const { token } = req.headers;
        if (!token) throw 'No token provided.';
        //verify token with the secreate key
        let verifed = await jwt.verify(token, config.jwt_secrete);
        if (!verifed) throw 'Failed to authenticate token.';
        let user= await fetchUserByApikey(verifed.id);
        if(user) res.status(200).json(user);
        next();
    } catch (error) {
        return responseMixin.error(error);
    }
}