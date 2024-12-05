const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model')
const  captainService = require('../services/captain.service')
const { validationResult } = require("express-validator")


module.exports.registerCaptain=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { fullname, email, password,vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email})

    if(isCaptainAlreadyExist){
        return res.status(400).json({ message:"Captain Already Exist"});
    }
    const hashedPassword = await captainModel.hashPassword(password)

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        });

        // console.log('uuu',user)
        if (!captain) {
            return res.status(500).json({ message: "captain creation failed" });
        }

        const token = await captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (error) {
        console.log(error)
    }

    


}


module.exports.loginCaptain=async(req,res,next)=>{
    console.log("hii")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log("hii1")


    const {  email, password } = req.body;

    const captain=await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token= await captain.generateAuthToken();

    // res.cookie('token',token)

    res.cookie('token', token, {
        httpOnly: true, // Prevent access from JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Mitigate CSRF attacks
    });
    console.log('ttt',token)

    res.status(200).json({token,captain})

}


module.exports.getCaptainProfile=async(req,res,next)=>{
    res.status(200).json({captain:req.captain})
}


module.exports.logoutCaptains=async(req,res,next)=>{
    try {
      

        // Access the token from cookies or Authorization header
        const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: 'Token not found' });
        }

        // Add the token to the blacklist
        await blacklistTokenModel.create({ token });

          // Clear the token cookie
          res.clearCookie('token');

        // Respond with success
        res.status(200).json({ message: 'Logged out' });

        // Additional note: Ensure your middleware checks against blacklisted tokens
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
}