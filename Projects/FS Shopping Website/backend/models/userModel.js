//this code serve to user authentication system

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    real_password: {type:String, required:true},
    cartData: {type:Object, default:{}},
}, {minimize:false}) 

// In mongo if no value is provided then no row for that key is created so to create the row for the cardData object even if no value is given be use minimize:false

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;