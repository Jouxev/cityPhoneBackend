import mongoose from "mongoose";
import User from "./Models/User.js";
import axios from "axios";
export const phoneChecker = (phone) => {
    // Check if phone is Contains only numbers
    let isNum = /^\d+$/.test(phone);
    if(!isNum) { return false}
    // Check if Phone has 10 digits 
    if(phone.length != 10){  return false}
    // check if Phone starts with 05 | 06 | 07
    if(!(phone.startsWith('05') || phone.startsWith('06') || phone.startsWith('07'))){  return false}
    return true;
}

export const checkPhoneNumber = async(user) => {
   
    const generatedCode = Math.floor(100000 + Math.random() * 900000);
    const expires = new Date().getTime() + (1000*60*2);
    await User.findByIdAndUpdate(user._id, {
        $set: { otp: {
            "id": user._id,
            "phone": user.phone,
            "code": generatedCode,
            "expires": expires
        }}
    })
    var params = new URLSearchParams();
    params.append('access_token', process.env.DZWILIO_TOKEN);
    params.append('phone_number', user.phone);
    params.append('message', 'Code verification echrilna est : ' + generatedCode);

  await axios.post('https://dzwilio.com/messages.php', params).then((res) => {
    console.log('Code verification Sent Successfully');        
    }).catch(err => console.error(err))
    
}

export const checkPhoneCode = async () => {

}