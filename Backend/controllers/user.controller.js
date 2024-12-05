const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require("express-validator")
const blackListTokenModel = require('../models/blacklistToken.model')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body)

    // const {firstname,lastname,email,password}=req.body;
    const { fullname, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({ message:"User Already Exist"});
    }
    const hashedPassword = await userModel.hashPassword(password)

    try {
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        console.log('uuu',user)
        if (!user) {
            return res.status(500).json({ message: "User creation failed" });
        }

        const token = await user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (error) {
        next(error); 
    }


}


module.exports.loginUser=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const {  email, password } = req.body;

    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token= await user.generateAuthToken();

    // res.cookie('token',token)

    res.cookie('token', token, {
        httpOnly: true, // Prevent access from JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Mitigate CSRF attacks
    });
    console.log('ttt',token)

    res.status(200).json({token,user})

}


module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');

        // Access the token from cookies or Authorization header
        const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: 'Token not found' });
        }

        // Add the token to the blacklist
        await blackListTokenModel.create({ token });

        // Respond with success
        res.status(200).json({ message: 'Logged out' });

        // Additional note: Ensure your middleware checks against blacklisted tokens
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



