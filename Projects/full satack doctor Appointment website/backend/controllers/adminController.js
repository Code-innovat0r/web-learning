import validator from 'validator';
import bcrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
// adding  the doctor

const addDoctor = async (req, res) => {
    try{

        const {name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file.filename

        //checking for all the data to add in the database
        if(!name ||!email ||!password ||!speciality ||!degree ||!experience ||!about ||!fees ||!address ||!imageFile){
            return res.json({success:false , message: 'Please enter all the required fields'})
        }

        //validating the email formate
        if(!validator.isEmail(email)){
            return res.json({success:false, message: 'Invalid Email'})
        }

        //check the email already exist or not
        const exists = await doctorModel.findOne({email: email});
        if(exists) {
            return res.json({success:false, message: 'Email already exists' });
        }

        //validating the strong password
        if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 2, minUppercase: 2, minNumbers: 2, minSymbols: 2})){
            return res.json({success:false, message: 'Password should be at least 8 characters long, contain at least two uppercase letters, two lowercase letters, two numbers, and two symbols'})
        }

        //check weather the image is uploaded or not
        if(!imageFile){
            return res.json({success:false, message: 'Please upload an image for the Profile Photo'})
        }

        //hassing the password
        const salt = await bcrypt.genSalt(10) // level of the increption 5-15 is range
        const hashedPassword = await bcrypt.hash(password, salt);

        //add data
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            originalPassword:password,
            image: imageFile,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now(),
        }

        //fit the data in the model
        const newDoctor = new doctorModel(doctorData)
        //save in the data base
        await newDoctor.save()

        return res.json({success:true, message:"Doctor profile created successfully!"})

    }catch(error){
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}


//Api for the admin login

const loginAdmin = async (req, res) =>{
    try{
        const {email, password} = req.body
        //check if the email and password is provided
        if(!email ||!password){
            return res.json({success:false, message:'Please provide email and password'})
        }
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            return res.json({success:true, message:'Admin Login Successfully!', token}) 
        }else{
            return res.json({success:false, message:'Invalid email or password!'})
        }
    }catch(error){
        console.log(error)
        return res.json({success:false,message:"Error"})
    }
}

// API for the doctor list for the admin panel
const doctorList = async (req, res) =>{
    try{
        //before sending the list of the doctor for the display on the admin panel wee need to remove the password fields for the security.So we use the select method and pass '-field_name' to remove
        const doctors = await doctorModel.find({}).select(['-password','-originalPassword'])
        return res.json({success:true,data:doctors})
    }catch(error){
        console.log(error)
        return res.json({success:false, message:"Error in fetching from server."})
    }
}


//API to get the all doctor list
const appointmentList = async (req, res) =>{
    try{
        const list  = await appointmentModel.find({});
        if(list.length > 0){
            res.json({success:true, data:list})
        }else{
            res.json({success:false, message:'Doctor List is empty'})
        }
    }catch(error){
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

//API to cancel the doctor appointment 
const cancelAppointment = async (req, res) => {
    try {
        const { id, userId } = req.body
        const response = await appointmentModel.findById(id)
        // cancel the appointment
        if (userId === response.userId) {
            await appointmentModel.findByIdAndUpdate(id, { cancelled: true })
            //release the slot from the doctors  too
            const docData = await doctorModel.findById(response.docId)
            let slots_booked = docData.slots_booked
            if (slots_booked[response.slotDate]) {
                slots_booked[response.slotDate] = slots_booked[response.slotDate].filter(time => time !== response.slotTime)
            }
            const release = await doctorModel.findByIdAndUpdate(response.docId, { slots_booked })
            if (release) {
                return res.json({ success: true, message: "Appointment Cancelled !!" })
            } else {

                return res.json({ success: true, message: "Appointment not Cancelled !!" })
            }
        } else {
            return res.json({ success: false, message: "You are not authorized to update this appointment!!" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// API to get the data for the admin dashboard
const adminDashboard = async (req, res) =>{
    try{
        const doctor = await doctorModel.find({})
        const user = await userModel.find({})
        const appointment = await appointmentModel.find({})

        const dasData = {
            doctors: doctor.length,
            appointment: appointment.length,
            patients: user.length,
            latestAppointment: appointment.reverse().slice(0,5)
        }

        res.json({success:true, dasData})

    }catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export {addDoctor, loginAdmin, doctorList, appointmentList, cancelAppointment, adminDashboard}