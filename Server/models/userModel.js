import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Avatar: {
    type: String,
    default: "",
  },
  mobile: {
    type: Number,
  },
  refresh_token: {
    type: String,
  },
  verify_email: {
    type: Boolean,
    default: false,
  },
  last_login_date: {
    type: Date,
    default: "",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Suspend"],
    default: "Active",
  },
  address_details: [{
    type:mongoose.Schema.ObjectId,
    ref:"address"
  }],
  Shopping_Cart: [{
    type:mongoose.Schema.ObjectId,
    ref:"cart"
  }],
  orderHistory: [{
    type:mongoose.Schema.ObjectId,
    ref:"order"
  }],
  forget_password:{
    type:String,
    default:null,
  },
  forget_password_expiry:{
    type:Date,
    default:""
  },
  role:{
    type:String,
    enum:["USER","ADMIN"],  
  }
},{
    timestamps:true
});

const Usermodel = mongoose.model("User",userSchema);

export default Usermodel