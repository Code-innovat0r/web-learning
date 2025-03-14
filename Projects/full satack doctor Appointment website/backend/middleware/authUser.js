import jwt from 'jsonwebtoken'


//user authentication system, next is a callback function that store the next step for the function
const authuser = async (req, res, next) => {

    try{
        const {token} = req.headers //atoken = admin token
        if(!token) return res.json({success:false,message:"Not authorized login"})
        
        const decoded  = jwt.decode(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id;
        //next will pass the api to the main function after the middleware
        next()

    }catch(error){
        console.log(error)
        return res.json({success:false,message:"Error"})
    }
}

export default authuser