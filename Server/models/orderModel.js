import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    orderId:{
        type:String,
        required:[true,"Provide OrderId"],
        unique:true
    },
    product_id:{
          type:mongoose.Schema.ObjectId,
          ref:"Product"
    },
    product_details:{
        name:String,
        image:Array
    },
    paymentID:{
        type:String,
        default:""
    },
    payment_status:{
        type:String,
        default:""
    },
    delivery_address:{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    },
    subTotal:{
        type:Number,
        default:0
    },
    total_amount:{
        type:Number,
        default:0
    },
    invoice_receipt:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const orderModel = mongoose.model("order",orderSchema)

export default orderModel