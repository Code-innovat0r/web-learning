/* 
Before directly sending the request from the server to the database I am sending it to the middleware(authMiddleware) where the validation of the web token take place that is generated during the login or Signup process for the further on deletion or the addition in the cart
*/

import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartControllers.js';
import authMiddleware from '../middleware/auth.js';


const cartRouter = express.Router();

//on request /add serve addToCart function
cartRouter.post('/add', authMiddleware , addToCart);

//on request /remove serve removeFromCart function
cartRouter.post('/remove', authMiddleware , removeFromCart);

//on request /get serve getCart function

cartRouter.get('/get', authMiddleware , getCart);

export default cartRouter;
