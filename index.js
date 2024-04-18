import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/user.js"
import doctorRoute from "./Routes/doctor.js"
import reviewRoute from "./Routes/review.js"
import bookingRoute from "./Routes/booking.js"
import cryptoRandomString from 'crypto-random-string'
dotenv.config()
const app=express()
const port=process.env.PORT || 8000
const corsOptions={
    origin:true
}
app.get('/',(req,res)=>{
    res.send("Api is working")
})
mongoose.set('strictQuery',false)
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB database is connected')
    } catch (error) {
        console.log('mongoDB database is connection failed')
    }
}
//middleware




app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/doctor',doctorRoute)
app.use('/api/reviews',reviewRoute)
app.use('/api/booking',bookingRoute)
app.listen(port,()=>{
    connectDB();
    console.log(`Server is runing on ${port}`)
})