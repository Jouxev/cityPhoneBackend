import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        index: true,
        sparse: true
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String        
    },
    adress: {
        type: String,
    },
    wilaya: {
        type: String,
    },
    commune: {
        type: String,
    },
    orders: {
        type: Array,
        default: [],
    },
    profilePic: {
        type: String,
        default: "",
    },
    favorites : {
        type: Array,
        default: [],
    },
    wallet:{
        type: Number,
        default: 0,
    },
    trusted_devices : {
        type: Object,
        default: {},
    },
    isAdrmin : {
        type: Boolean,
        default: false
    },
    otp : {
        type: Object,
        required: false
    }
}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema);