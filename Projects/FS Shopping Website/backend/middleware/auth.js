//This middleware catch the token and decode it and pass the id from it in the body...

import jwt from 'jsonwebtoken';

// middleware to verify the JWT token
const authMiddleware = async (req, res, next) => {
    //taking the token from the headers
    const {token} = req.headers;

    if(!token){
        return res.json({success: false, message: 'Not Authorized Login Again'});
    }

    try{
        // we have decoded the token with the JWT_SECRET and providing the database-id of the user so on decoding With the JWT_SECRET I will get the same database id  
        const token_decode = jwt.decode(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;  // we pass the id in the body of the api request as userid
        next(); // send the request for further processing
    }catch(err){
        console.log(err);
        res.json({success: false, message: 'Token is not valid'});
    }
};

export default authMiddleware;