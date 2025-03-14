import express from 'express';
import { addDoctor, loginAdmin, doctorList, appointmentList, cancelAppointment, adminDashboard} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authadmin from '../middleware/authAdmin.js';
import { updateDoctorAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();


adminRouter.post('/doctor-list', authadmin, doctorList);
adminRouter.post('/doctor-available',authadmin, updateDoctorAvailability);
adminRouter.post('/add-doctor',  upload.single('image'),authadmin, addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/appointments', authadmin, appointmentList)
adminRouter.post('/cancel-appointment', authadmin, cancelAppointment)
adminRouter.get('/dashboard', authadmin, adminDashboard)

export default adminRouter