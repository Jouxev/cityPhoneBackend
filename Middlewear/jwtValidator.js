import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

const verifyAccessToken = (token) => {
    const secret = process.env.JWT;
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

export const  authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next();
  }