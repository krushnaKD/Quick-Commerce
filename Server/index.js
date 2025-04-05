import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path";
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/connectDB.js"
import userRouter from "./routes/userRoute.js"



const app = express()

app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT = 8080 || process.env.PORT
console.log("Current file path:", import.meta.url);

app.get("/",(req,res)=>{
    res.send("hello welcome back")
})
app.use("/api/user",userRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER IS STARTED ON ${PORT}`)
    })
})

