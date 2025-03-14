import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/mongodb.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRoutes from './routes/userRoutes.js';


//app config
const app = express();
//if any paricular port is defined then use that else use the port 4000
const port = process.env.PORT || 4000;
//connecting to the mongodb
connectDB()

//middleware
//The app.use(express.json()) function in Express.js is a built-in middleware that parses incoming requests with JSON payloads and makes the parsed data available in req.body
app.use(express.json());
//cors function help to connect the frontend with the backend server
app.use(cors());


// api endpoints for the testing 
app.get('/',(req, res)=>{
    res.send('Hello from the server paras is great!');
});

//localhost:4000/api/admin
app.use('/api/admin', adminRouter)

//localhost:4000/api/doctor
app.use('/api/doctor',doctorRouter)

//localhost:4000/api/user
app.use('/api/user', userRoutes)

//serve the images folder on the server
app.use('/images/', express.static('uploads'));

//start the server
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);  //log the port on which server is running  // in this case it will be 4000 if not defined in the.env file  // if it is defined in the.env file then it will be that port number
});

