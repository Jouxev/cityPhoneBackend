import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';


dotenv.config();
const port = process.env.PORT || 3004;
const connect = () => {
    mongoose.connect(process.env.MONGO).then(()=> {
        console.log('Connected to Database')
    }).catch(e => {
        throw e;
    })
}

const app = express();
app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

app.use(cookieParser())
app.use(express.json())
app.use(cors())
// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message ||  'Server error';
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})
app.listen(port , () => {
    connect();
    console.log(`Server listening on port ${port}`);
})