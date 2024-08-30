import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderControllers.js";
import express from "express";
import authmiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/place', authmiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authmiddleware, userOrders);
orderRouter.post('/list', listOrders);
orderRouter.post('/updatestatus', updateStatus);

export default orderRouter;
