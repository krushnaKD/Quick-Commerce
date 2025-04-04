import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
   console.error("MONGODB_URI is missing! Please set it in your .env file.");
   process.exit(1);
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected Succesfully");
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default connectDB