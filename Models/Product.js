import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pprice: {
        type: String,
        required : true
    },
    sprice: {
        type: String,
        required : true
    },
    wsprice: {
        type: String,
    },
    wsprice2: {
        type : String
    },
    qty: {
        type: String        
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Product', ProductSchema);