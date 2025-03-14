import express from 'express';
import { doctorList, loginDoctor, doctorAppointment, appointmentComplete, cancelAppointment, doctorDashoard, doctorProfile, updateProfile } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router();

// API to get the doctor list
doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/doctor-appointment', authDoctor, doctorAppointment);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment);
doctorRouter.post('/doctor-dashboard', authDoctor, doctorDashoard);
doctorRouter.get('/doctor-profile', authDoctor, doctorProfile);
doctorRouter.post('/doctor-profile-update', authDoctor, updateProfile);


export default doctorRouter;