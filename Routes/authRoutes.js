import express from 'express';
import { signin, phoneSignup, emailSignup, checkOtp, changePassword } from '../Controllers/authController.js';
import { authenticateToken } from '../Middlewear/jwtValidator.js';

const authRoutes = express.Router();
// create User 
authRoutes.post('/signup_phone', phoneSignup);
authRoutes.post('/signup_email', emailSignup);
// Sign in
authRoutes.post('/signin', signin);
// Check Otp 
authRoutes.post('/check_otp', checkOtp);
// Change User password
authRoutes.put('/changePwd/:id', authenticateToken, changePassword)

export default authRoutes;