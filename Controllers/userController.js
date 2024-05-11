import User from "../Models/User.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

const getUser = async (req, res, next) => {
    const user  = await User.findById(req.params.id);
    if(user){
        const {otp, password, ...myUser} = user._doc; 
        res.status(200).json(myUser)
    }else{
        next(createError(404, "User not found"))
    }
}

const updateUser = async (req, res, next) => {
    if(req.body.email){
        const isEmailTaken = await User.findOne({ email : req.body.email})
        if (isEmailTaken && isEmailTaken._id != req.params.id){
            res.status(403).json('Email is not available');
        } 
    }

    const user  = await User.findByIdAndUpdate(req.params.id, req.body);   
    if(user){
       const updatedUser = await User.findById(req.params.id); 
        const {otp, password,...myUser} = updatedUser._doc; 
        const token = jwt.sign({id: myUser._id}, process.env.JWT);
        res.cookie("access_token", token,{ httpOnly: true }).status(200).json({...myUser, token});
    }else{
        next(createError(404, "User not found"))    
    }
}

export  { getUser, updateUser}
