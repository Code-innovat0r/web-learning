import express from 'express';
import {RegisterUser, login, Profile, UpdateProfile, bookAppointment, payment, listAppointment,cancelAppointment, verifyPayment} from '../controllers/userController.js'
import authuser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRoutes = express.Router();

userRoutes.post('/register', RegisterUser)
userRoutes.post('/login', login)
userRoutes.post('/profile', authuser, Profile)
userRoutes.post('/update-profile', upload.single('image'), authuser, UpdateProfile)
userRoutes.post('/book-appointment',authuser, bookAppointment)
userRoutes.get('/list-appointment',authuser, listAppointment)
userRoutes.post('/update-appointment',authuser, cancelAppointment)
userRoutes.post('/payment',authuser, payment)
userRoutes.post('/verify-payment',authuser, verifyPayment)

export default userRoutes;