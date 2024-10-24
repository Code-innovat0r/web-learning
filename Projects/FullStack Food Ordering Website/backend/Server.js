import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config' //include the .env file in the project


//app config
const app = express();
const port = 4000;

//middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);

//this code serve to user authentication system
//if /api/user come in the request then ask to userRoute for further requests
app.use("/api/user", userRouter);
//----------------------------------------------------------------

//cart routes
app.use("/api/cart", cartRouter);

//order routes
app.use("/api/order", orderRouter);

//declaring the upload folder as the static folder
app.use("/images", express.static('uploads'))

app.get("/", (req, res) => {
    res.send("Hello I am a backend server")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`); 
});