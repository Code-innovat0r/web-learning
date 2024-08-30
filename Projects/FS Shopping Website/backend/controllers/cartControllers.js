import userModel from '../models/userModel.js'

//add item to user cart
const addToCart = async (req, res) => {
    try {
        let userdata =  await userModel.findOne({_id:req.body.userId});
        let cartData = await userdata.cartData;
        if(!cartData[req.body.itemid]){
            cartData[req.body.itemid] = 1;
        }else{
            cartData[req.body.itemid] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
        res.json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error occur in addition' });
    }
}


//remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if(cartData[req.body.itemid]===1){
            /* It will completly remove the key-value pair from object and help to save the space and time for searching */
            delete cartData[`${req.body.itemid}`];
        }
        else if(cartData[req.body.itemid]>1){
            cartData[req.body.itemid] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
        res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error occur in removal' });
    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, data: cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error occur in fetching cart data' });
    }
}



export {addToCart, removeFromCart, getCart}