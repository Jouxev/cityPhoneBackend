import express from 'express'
import { authenticateToken } from '../Middlewear/jwtValidator.js';
import { addProduct, getAllProduct, getProduct } from '../Controllers/productController.js';

const productRoutes = express.Router();

// Get  product by id
productRoutes.get('/show/:id', getProduct);
// Get All Products 
productRoutes.get('/all', getAllProduct)
// Update User Info 
productRoutes.post('/add', addProduct);

export default productRoutes;