const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackListTokenModel=require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model')


module.exports.authUser = async (req, res, next) => {

    console.log('Cookies:', req.cookies);
    console.log('Authorization Header:', req.headers.authorization);

    // const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);


    console.log('Cookies1:', req.cookies);
    console.log('Authorization Header1:', req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token })

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user = user; //req.user mein set karogeee
        return next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized ' })
    }
}



module.exports.authCaptain = async (req, res, next) => {
    try {
        console.log('Cookies:', req.cookies);
        console.log('Authorization Header:', req.headers.authorization);

        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        console.log('Extracted Token:', token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }

        // Check if the token is blacklisted
        const isBlacklisted = await blackListTokenModel.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
        }

        // Verify token and attach captain data to request object
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        req.captain = captain; // Attach captain to req for further use
        console.log('Captain attached to req:', req.captain);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication Error:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
