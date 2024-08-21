import Product from "../Models/Product.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

const getProduct = async (req, res, next) => {
    const product  = await Product.findById(req.params.id);
    if(product){
        res.status(200).json(product)
    }else{
        next(createError(404, "Product not found"))
    }
}

const getAllProduct  = async (req, res, next) => {
    const products = await Product.find({});
    res.status(200).json(products);
}

const addProduct  = async (req, res, next) => {
    const product  = new Product( req.body);
    if(product.save()){
        res.status(200).json(product);
    }

}

const deleteProduct = async(req, res, next) => {
    if( await Product.findByIdAndDelete(req.params.id)){
        res.status(200).json('product deleted')
    }
}

export  { getProduct, getAllProduct, addProduct, deleteProduct}
