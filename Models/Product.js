import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    pPrice: {
        type: String,
        required : true
    },
    salePrice: {
        type: String,
        required : true
    },
    wSalPrice: {
        type: String,
    },
    wSalePrice2: {
        type : String
    },
    pQnty: {
        type: String        
    },
    productDesc: {
        type: String,
    },
    img: {
        type: String,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Product', ProductSchema);