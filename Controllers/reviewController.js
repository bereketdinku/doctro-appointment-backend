import Review from "../models/ReviewSchema.js"
import Doctor from "../models/DoctorSchema.js"
export const getAllReviews=async(req,res)=>{
    try {
        const reviews=await Review.find({})
        res.status(200).json({success:true,message:"Successful",data:reviews})
    } catch (error) {
        res.status(404).json({success:false,message:"Not found",})
    }
}
export const createReview=async(req,res)=>{
    if(!req.body.doctor) req.body.doctor=req.params.doctorId
    if(!req.body.user) req.body.user=req.userId
    const newReview=new Review(req.body)
    try {
        const saveReview=await newReview.save()
        await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews:saveReview._id}
        })
        res.status(200).json({success:true,message:"Review submitted",data:saveReview})
        
    } catch (error) {
        res.status(200).json({success:false,message:error.message})
    }
}