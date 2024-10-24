import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
    

// placing the user order on the frontend page
const placeOrder = async (req, res) => {
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const frontend_url = 'http://localhost:5173/'

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save(); // saving in the database 


        // Sending the Amount in the INR to the stripe for the payment
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity: item.quantity
        }))

        //also passing the delivery charges to the strip in INR to include in payment
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2.23*100*80
            },
            quantity: 1
        })

        

        //creating a url that tell weather the payment done or not
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            //remender that after the ? we send the query 
            success_url:`${frontend_url}verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in placing order"})
    }
};


//Creating a tempararily verifying payment system (devops is a proper way to verify the order)
const verifyOrder = async (req, res) =>{
    const {orderId, success} = req.body
    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            res.json({success:true, message:'payment done successfully'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:'payment not done'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in verifying order"})
    }
}

//fetching all orders of a user
const userOrders = async (req, res) => {
    try {
        const userOrders = await orderModel.find({userId: `${req.body.userId}`})
        res.json({success: true, data: userOrders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in fetching orders"})
    }
}

// fetchin all the orders in the database
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        const order = orders.filter((order) => {return order.payment === true});
        console.log(orders)
        res.json({ success: true, data: order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error in fetching orders" })
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.id, { status:req.body.status})
        res.json({ success: true, message: 'Status updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error in updating status' })
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}