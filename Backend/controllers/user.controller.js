const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require("express-validator")

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body)

    // const {firstname,lastname,email,password}=req.body;
    const { fullname, email, password } = req.body;
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

    res.status(200).json({token,user})

}