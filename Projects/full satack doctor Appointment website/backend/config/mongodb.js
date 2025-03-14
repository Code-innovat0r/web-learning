import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/doctor-Application').then(()=>{console.log('connected DB')});
}

