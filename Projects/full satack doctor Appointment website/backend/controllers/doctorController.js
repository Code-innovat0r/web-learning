import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"

//ApI to update the dactor avaibility for the admin panel


const updateDoctorAvailability = async (req, res) =>{
    try{
        const {doctorId, status} = req.body
        //check if doctorId is provided
        if(!doctorId){
            return res.json({success:false, message: 'Please provide doctor ID'})
        }

        //find the doctor by id and update the status
        const updatedDoctor = await doctorModel.findByIdAndUpdate(doctorId, {available: status})
        if(!updatedDoctor){
            return res.json({success:false, message: 'Doctor not found'})
        }

        return res.json({success:true, message:"Doctor availability updated successfully!"})

    }catch(error){
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

const doctorList = async (req, res) => {
    try {
        const list  = await doctorModel.find({}).select(['-password','-originalPassword','-email']);
        if(list.length > 0){
            res.json({success:true, data:list})
        }else{
            res.json({success:false, message:'Doctor List is empty'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Api for the doctor login method
const loginDoctor = async (req, res) => {
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.find({email}).select('-originalPassword');
        if(doctor.length === 0){
            return res.json({success:false, message:"Invalid Crediantials"})
        };
        const checkPassword = await bcrypt.compare(password, doctor[0].password);
        if(checkPassword) {
            const token = jwt.sign({id:doctor[0]._id}, process.env.JWT_SECRET)
            res.json({success:true, token});
        }else{
            res.json({success:false, message:"Invalid Crediantials"});
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Api to get the appointment of the specific doctors
const doctorAppointment = async (req, res) => {
    try {
        const {doctorId} = req.body;
        const appointment = await appointmentModel.find({docId:doctorId});
        res.json({success:true, appointment});
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Api to mark the appointent complete
const appointmentComplete = async (req, res)=>{
    try {
        const {doctorId, appointmentId} = req.body;
        const data = await appointmentModel.findById(appointmentId);

        if(data && data.docId === doctorId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {Visited: true, payment:true})
            return res.json({success: true, message:"Appointment Completed!!"})
        }else{
            return res.json({success: false, message:"Appointment failed to update !!"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Api to cancel the appointent on doctor panel
const cancelAppointment = async (req, res)=>{
    try {
        const {appointmentId, doctorId} = req.body;
        const data = await appointmentModel.findById(appointmentId);
                
        if(data && data.docId === doctorId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success: true, message:"Appointment Cancelled!!"})
        }else{
            return res.json({success: false, message:"Appointment failed to update !!"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Cancellation failed"})
    }
}

// Api to get dashboard data for the doctor panel
const doctorDashoard = async (req, res) =>{
    try{
        const {doctorId} = req.body
        const appointment = await appointmentModel.find({docId:doctorId})
        let earning = 0
        appointment.map((item)=>{
            if(item.Visited || item.payment){
                earning += item.amount
            }
        })
        
        let patients = []
        appointment.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments: appointment.length,
            patients: patients.length,
            latestAppointment: appointment.reverse().slice(0,5)
        }

        return res.json({success: true, dashData})

    }catch(error){
        console.log(error)
        res.json({success:false, message:"Cancellation failed"})
    }
}

// API to get the doctor profile
const doctorProfile = async (req, res) =>{
    try {
        const {doctorId} = req.body
        const profile = await doctorModel.findById(doctorId).select(['-password', '-originalPassword'])
        return res.json({success:true, profile})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Unable to get Profile Data !!"})
    }
}

//Api to update the profile on the doctor
const updateProfile = async (req, res) =>{
    try {
        const {doctorId, address, fees, available} = req.body

        await doctorModel.findByIdAndUpdate(doctorId, {address, fees, available})

        return res.json({success:true, message:"Pofile Updated !!"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Unable to update Profile !!"})
    }
}

export {updateDoctorAvailability, doctorList, loginDoctor, doctorAppointment, appointmentComplete, cancelAppointment, doctorDashoard, doctorProfile, updateProfile}