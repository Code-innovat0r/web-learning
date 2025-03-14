import jwt from 'jsonwebtoken'


//admin authentication system, next is a callback function that store the next step for the function
const authadmin = async (req, res, next) => {

    try{
        const {atoken} = req.headers //atoken = admin token
        if(!atoken) return res.json({success:false,message:"Not authorized login"})
        
        const decoded  = jwt.decode(atoken, process.env.JWT_SECRET)
        if (decoded !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Not authorized"})
        }

        //next will pass the api to the main function after the middleware
        next()

    }catch(error){
        console.log(error)
        return res.json({success:false,message:"Error"})
    }
}

export default authadmin