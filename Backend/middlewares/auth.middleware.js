const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.authUser = async (req, res, next) => {

    console.log('Cookies:', req.cookies);
console.log('Authorization Header:', req.headers.authorization);

    // const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);


    console.log('Cookies1:', req.cookies);
console.log('Authorization Header1:', req.headers.authorization);

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    const isBlacklisted = await userModel.findOne({token:token})

    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user=user; //req.user mein set karogeee
        return next()
    } catch (error) {
        return res.status(401).json({message:'Unauthorized '})
    }
}