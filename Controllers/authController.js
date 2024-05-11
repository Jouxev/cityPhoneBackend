import mongoose from "mongoose";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import { checkPhoneNumber, phoneChecker } from "../checker.js";

const phoneSignup = async (req, res, next) => {    
    if(!req.body.phone) return next(createError(401, "Phone is required"))
    if(!phoneChecker(req.body.phone)) next(createError(401, "Phone check failed"))    
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash  = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        const {password,otp, ...myNewUser} = newUser._doc;
        await checkPhoneNumber(newUser);
        res.status(200).json({ success: true, user: myNewUser, next: "phone" });
        
        
    }catch(err){
        next(err)
    }

};

const emailSignup = async (req, res, next) => {
    if(!req.body.email) return next(createError(401, "Email is required"))
    if(phoneChecker(req.body.email)){
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash  = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({name: req.body.name, phone: req.body.email, password: hash });
            await newUser.save();
            res.status(200).send(`${newUser.name} has been created`);
            
        }catch(err){
            next(err)
        }
        }else{
            try {
                const salt = bcrypt.genSaltSync(10);
                const hash  = bcrypt.hashSync(req.body.password, salt);
                const newUser = new User({...req.body, password: hash });
                await newUser.save();
                res.status(200).send(`${newUser.name} has been created`);
                
            }catch(err){
                next(err)
            }
        }
    
};

const signin = async (req, res, next) => {
    try{

        const user = await User.findOne({ email: req.body.email}) || await User.findOne({phone: req.body.email});

    
        if(!user) return next(createError(404, "User not found"));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) return next(createError(404, "Username or password incorrect"));
        const token = jwt.sign({id: user._id}, process.env.JWT);
        const { password, ...userOtherDetails } = user._doc;
        res.cookie("access_token", token,{ httpOnly: true }).status(200).json({...userOtherDetails, token});
    }catch(err){
        next(err);
    }
}

const changePassword = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) return next(createError(404, "User not found"));
        const isCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
        if(!isCorrect) return next(createError(403, "password incorrect"));
        const salt = bcrypt.genSaltSync(10);
        const hash  = bcrypt.hashSync(req.body.newPassword, salt);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { password : hash});
        
        if(updatedUser){
            res.status(200).json('user password has been changed')
        }else{
            res.status(500).json('error while changing password')
        }


    }catch(err){
        next(err)
    }
}

const checkOtp = async(req, res, next) => {
    try{
    const user = await User.findById(req.body.user._id)  
    !user && next(createError(404, "User not found"))
    const {password, otp, ...myNewUser} = user._doc;
    if(user.otp.id == req.body.user._id && user.otp.phone == req.body.user.phone && user.otp.code == req.body.otp && user.otp.expires > Date.now()){        
        await User.findByIdAndUpdate(user._id , { $set: { phoneVerified : true}});
        res.status(200).json({user: myNewUser, otpVerified: true});
    }else{
        res.status(404).json({otpVerified: false});
    }
    }catch(err){
        next(createError(err))
    }
}

export { phoneSignup, emailSignup, signin, checkOtp, changePassword};