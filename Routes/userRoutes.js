import express from 'express'
import { getUser, updateUser } from '../Controllers/userController.js';
import { authenticateToken } from '../Middlewear/jwtValidator.js';

const userRoutes = express.Router();

// Get user Info 
userRoutes.get('/show/:id', getUser);
// Update User Info 
userRoutes.put('/update/:id', authenticateToken, updateUser);

export default userRoutes;