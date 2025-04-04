import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  Pname: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    default: [],
  },
  category: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
  ],
  subCategory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "subCategory",
    }
  ],
  unit:{
    type:String,
    default:""
  },
  stock:{
    type:Number,
    default:0,
  },
  price:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    default:null
  },
  description:{
    type:String,
    default:"Amazing Product"
  },
 more_details:{
    type:Object,
    default:{}
 },
 publish:{
    type:Boolean,
    default:true
 },

},{
    timestamps:true,
});

const ProductModel = mongoose.model("Product",ProductSchema);

export default ProductModel
