import mongoose from "mongoose";


const doctorSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    originalPassword:{type:String, required:true},
    image:{type:String, required:true},
    speciality:{type:String, required:true},
    degree: {type:String, required:true},
    experience: {type:String, required:true},
    about: {type:String, required:true},
    available:{type:Boolean, default:true},
    fees:{type:Number, required:true},
    address:{type:Object, required:true},
    date: {type:Number, required:true},
    slots_booked: {type:Object, default:{}},
},{minimize:false});

// minimize says should I minimize the storage space means if for some row user doesn't enter any info then should I leave the space for the data or not.. So whenever we put any default empty value we says minimize false because we want the space should be left for the data

const doctorModel = mongoose.models.doctor || mongoose.model('doctor',doctorSchema);

/* (mongoose.models.doctor || mongoose.model('doctor',doctorSchema)) Explanation:
 -> mongoose.models.doctor: This checks if a model named doctor already exists in mongoose.models. mongoose.   models is a collection of all the models that have been registered with Mongoose. This part ensures that you do not redefine the model if it already exists. It's useful in cases where the code might be reloaded multiple times (e.g., in a development environment with hot reloading) and you want to prevent errors from attempting to redefine the model.

 -> mongoose.model('doctor', doctorSchema): If the doctor model doesn't exist, this part creates a new model named doctor based on the schema doctorSchema. The first argument 'doctor' is the name of the model, and the second argument doctorSchema is the schema that defines the structure and behavior of the documents in the doctor collection. */


 export default doctorModel;


