// This file help you to access the any function variable andany data define in the ContextValue anywhere in the project

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({})

    const url = 'http://localhost:4000'


    //sending a api request to get the available food items from the database
    const [food_list, setFood_List] = useState([])

    const getfood = async () => {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setFood_List(response.data.data)
      } else {
        console.log('Error getting food items')
      }
    }

    //Store the token generated
    const [token, setToken] = useState("");

    const addToCart = async (itemId) =>{
        if(!cartItem[itemId]){
            setCartItem((prev) => ({...prev, [itemId]: 1}))
        }else{
            setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        }
        if(token){
            const response = await axios.post(url+'/api/cart/add', {itemid:itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        if(cartItem[itemId] > 0){
            setCartItem((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        }
        if(token){
            const response = await axios.post(url+'/api/cart/remove', {itemid:itemId}, {headers:{token}})
        }
    }

    const getTotalAmount = () => {
        let total = 0;
        for (const item in cartItem) {
            let price = food_list.find((food) => food._id === item)
            total += price.price * cartItem[item]
        }
        return total.toFixed(2); 
    }

    //keep the + and - button on the image after refresh if that is added in cart
    const cartItems = async (token) => {
        const response = await axios.get(url+'/api/cart/get',{headers:{token}});
        if(response.data.success){
            setCartItem(response.data.data);
        }else{
            console.log('Error getting cart items')
        }
    }

    

    //writing a logic that use the local storage tokaen and prevent from signout while refreshing
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken);
        }
        //calling the getfood function on every reload
        getfood();
        //I don't know why I have to provide the token as a parameter I am unable to use the useState token
        cartItems(localStorage.getItem('token')); // getting the cart items when the component mounts and refreshes
    })


    const ContextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,  // used in loginpopup, 
        token, //used in loginpopup, navbar
        setToken, //used in loginpopup, navbar
        // add other context values here...
    }
    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;