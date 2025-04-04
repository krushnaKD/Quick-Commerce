import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    produtId:{
        type:mongoose.Schema.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const cartModel = mongoose.model("cart",cartSchema)

export default cartModel