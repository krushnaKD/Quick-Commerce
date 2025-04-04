import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    address:{
        type:String,

    },
    city:{
        type:String,
    },
    state:{
        type:String,

    },
    pincode:{
        type:Number,
    },
    country:{
        type:String,
        default:"India",
    },
    mobile:{
        type:Number,

    },
    status:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
})

const addresModel = mongoose.model("address",addressSchema);

export default addresModel