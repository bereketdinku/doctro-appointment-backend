import express, { Router } from "express"
import { updateDoctor,deleteDoctor,getAllDoctor,getDoctorProfile,getSingleDoctor } from "../Controllers/doctorController.js"
import { authenticate, restrict } from "../auth/verifyToken.js"
import reviewRouter from "./review.js"
import { getUserProfile } from "../Controllers/userController.js"
const router=express.Router()
router.use('/:doctorId/reviews',reviewRouter)
router.get('/:id',getSingleDoctor)
router.get('/',getAllDoctor)
router.put('/:id',authenticate,restrict(['doctor']),updateDoctor)
router.get('/profile/me',authenticate,restrict(['doctor']),getDoctorProfile)
router.delete('/:id',authenticate,restrict(['doctor']),deleteDoctor)
export default router