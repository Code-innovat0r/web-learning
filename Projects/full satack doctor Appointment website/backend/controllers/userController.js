import userModel from "../models/userModel.js"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import validator from "validator"
import bcrypt, { genSalt } from "bcrypt"
import jwt from 'jsonwebtoken'

//importinng the razorpay
import razorpay from 'razorpay' 


//Register the new user

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //check if all fields are provided
        if (!name || !email || !password) return res.json({ success: false, message: "All fields are required to SignIn." })

        //check for the correct email format
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid Email-id." })

        //check if the email already exists
        const exist = await userModel.findOne({ email: email });
        if (exist) {
            return res.json({ success: false, message: "Email already exists try another Email-id." })
        }

        //check for the strong password
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 2, minSymbols: 1 })) return res.json({ success: false, message: "Password must be at least 8 characters long, contain at least 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 symbols." })

        //hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const data = {
            name,
            email,
            password: hashedPassword,
            originalpassword: password,
        }

        const newUser = new userModel(data)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({ success: true, message: "Account is created Successfully", token })

    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: "Server Error." })
    }
}


//Api for the log-in of the user
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        //check if the email and password is provided
        if (!email || !password) {
            return res.json({ success: false, message: "Please provide email and password" })
        }

        //Validate the email
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid Email-id." });

        //find user in the database with the provided email and password
        const user = await userModel.findOne({ email: email })
        if (user) {
            //check if the hashed password matches with the one in the database
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                //generate a JWT token for the authenticated user
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                return res.json({ success: true, message: "Login Successful", token })
            } else {
                return res.json({ success: false, message: "Invalid email or password" })
            }
        } else {
            return res.json({ success: false, message: "No Account Exists with this email, try Sign-Up" })
        }
    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: "Server Error." })
    }
}

//Api to fetch the Profile
const Profile = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findOne({ _id: userId }).select(['-password', '-originalpassword'])
        if (user) {
            res.json({ success: true, user })
        } else {
            res.json({ success: false, message: "User not found" })
        }
    } catch (error) {
        console.log(e)
        return res.json({ success: false, message: "Server Error." })
    }
}

//API to update the user profile
const UpdateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        //Check if data is provided or not
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "All the fields must be defined" })
        }
        const a = await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (a) {
            if (req.file) {
                const image_name = req.file.filename
                const image_update = await userModel.findByIdAndUpdate(userId, { image: image_name })
            }
            return res.json({ success: true, message: "User profile updated" })
        } else {
            return res.json({ success: false, message: "User profile not found" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Server Error." })
    }
}


//API to book Appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select(['-password', '-originalPassword'])

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is Not Available!" })
        }
        let slots_booked = docData.slots_booked

        //Check if the slot is already booked 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is already booked!" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            //creating the date slot
            slots_booked[slotDate] = []
            //pushing the time in the slot
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select(['-password', '-originalPassword'])

        //we have created the copy of docdata.slots_booked avove in the 'slots_booked' variable so delete it from docData
        //we are doing this because we are going to store doctor data in the appointment also and there we don't want to store the history of the doctor appointment booking the some other columns too that neglected using the select keyword while fetching
        delete docData.slots_booked

        //creating dictionary to store data in model sequence
        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            bookingDate: Date.now(),

        }
        //fit the data in the model
        const newAppointment = new appointmentModel(appointmentData)
        //save in database
        await newAppointment.save()

        //update the doctor data in the database with the booked slot
        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slots_booked })

        //return success message
        return res.json({ success: true, message: "Slot is booked for you!" })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Server Error." })
    }
}

// API to get the users all appointment
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        // const appointments = await appointmentModel.find({ userId }).populate('docId', ['name', 'fees', 'image', 'department', 'experience']).populate('userData', ['name', 'email', 'phone', 'dob', 'gender', 'address', 'image'])
        const appointment = await appointmentModel.find({ userId });
        return res.json({ success: true, data: appointment })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
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

//API to make payment of the appointment using the razorpay

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
    currency: process.env.CURRENCY // this is the currency in which the payment will be made, it can be 'INR', 'USD', 'EUR', etc.
})

const payment = async (req, res) => {
    try {
        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment not found or cancelled' });
        }

        //creating the option for the razorpay payment
        const options = {
            amount: appointmentData.amount,
            currency: process.env.CURRENCY,
            receipt: appointmentData,
        }

        //creation of an order
        const order = await razorpayInstance.orders.create(options);

        res.json({ success: true, order,message:"Order created successfully"});
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// APi to verify the razorpay payment 
const verifyPayment = async (req, res) => {
    try{
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            // payment is successful, update the appointment status
            // in receipt we have send the appointment id
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment : true })
            return res.json({ success: true, message: 'Payment successful' })
        }else{
            return res.json({ success: false, message: 'Payment failed' })
        }
    }catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


export { RegisterUser, login, Profile, UpdateProfile, bookAppointment, listAppointment, cancelAppointment, payment, verifyPayment };