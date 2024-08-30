//this code serve to user authentication system

import express from 'express'
import { loginUser, registerUser } from '../controllers/userControllers.js'


const userRouter = express.Router();

//on request /register serve registerUser function
userRouter.post('/register', registerUser);
//on request /login serve loginUser function
userRouter.post('/login', loginUser);


export default userRouter;