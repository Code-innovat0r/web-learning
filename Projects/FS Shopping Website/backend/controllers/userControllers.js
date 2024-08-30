//this code serve to user authentication system

import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//this function take the user id that given by mongo and generate a token for it and return it
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login user
const loginUser = async (req, res) => { 
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({ email: email});
        if(!user){
            return res.json({success: false, message: 'User not found' });
        }

        //checking weather the password is correct or not
        // .compare is a bcrypt method that is used to compare the password bcrypt passwords against the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: 'Incorrect Credential' });
        }

        //if password is correct then generate a token for the user
        const token = createToken(user._id);
        res.json({success: true, token: token, message: 'Successfully Login'});

    }catch(e){
        console.log(e);
        res.json({success: false, message:"Login Server Error"})
    }
}


//register user
const registerUser = async (req, res) => {
    //these variable store the respective data coming from body
    const { name, email, password } = req.body;
    try{
        //checking weather the email pre-exists or not
        const exists = await userModel.findOne({ email: email});
        if(exists) {
            return res.json({success:false, message: 'Email already exists' });
        }

        //validation for the email format
        if(!validator.isEmail(email)) {
            return res.json({success:false, message: 'Please enter a valid email' });
        }

        //for the strong password check
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        //hashing the password
        //genSalt take integer between 5 to 15 that is level of the password tufness
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //adding data to database
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            real_password: password
        });

        const user = await newUser.save()
        //calling the token function and sending the generated token as response
        const token = createToken(user._id); //user._id id mongo provided id
        res.json({ success: true, token: token, message: 'Account successfully created'});
 
    }catch(e){
        console.error(e);
        res.json({ success: false, message: 'Server Error' });
    }


}

export { loginUser, registerUser}