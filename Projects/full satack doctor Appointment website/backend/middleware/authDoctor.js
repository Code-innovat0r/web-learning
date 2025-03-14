import jwt from 'jsonwebtoken'


//doctor authentication system, next is a callback function that store the next step for the function
const authDoctor = async (req, res, next) => {

    try{
        const {doctortoken} = req.headers 
        if(!doctortoken) return res.json({success:false,message:"Not authorized login"})
        const decoded  = jwt.decode(doctortoken, process.env.JWT_SECRET)
        req.body.doctorId = decoded.id;
        //next will pass the api to the main function after the middleware
        next()

    }catch(error){
        console.log(error)
        return res.json({success:false,message:"Error"})
    }
}

export default authDoctor