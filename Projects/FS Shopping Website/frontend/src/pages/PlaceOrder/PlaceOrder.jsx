import React, { useContext, useEffect, useState} from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalAmount, token, food_list, url, cartItem} = useContext(StoreContext)

  const navigate = useNavigate();

  // if the cart is empty do not proced to the payment page
  useEffect(() => {
    if(!token){
      navigate('/cart')
    }else if(getTotalAmount() === "0.00"){
      navigate('/cart')
    }
  }, [])

  const [data, setData] = useState({
    firstName: "",
    lastName:"",
    email:"",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    setData({...data, [event.target.name]: event.target.value })
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) =>{
      if(cartItem[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: parseFloat(getTotalAmount())+2.23,
    }
    let response = await axios.post(`${url}/api/order/place`, orderData, {headers: {token}})
    if(response.data.success){  
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert('Failed to place order. Please try again.')
    }
  }
  

  return (
    <>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
              <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
              <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Second Name' />
            </div>
            <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address' />
            <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
            <div className='multi-fields'>
              <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
              <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
            </div>
            <div className='multi-fields'>
              <input required onChange={onChangeHandler} name='zipCode' value={data.zipCode} type="text" placeholder='Zip Code' />
              <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
            </div>
            <input required onChange={onChangeHandler} name='phone' value={data.phone} type="number" placeholder='Phone' />
        </div>
        <div className="place-order-right">
          <div className='cart-totals'>
            <h2>Cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>${getTotalAmount()}</p>
              </div>
              <div className='cart-total-details'>
                <p>Delivery fee</p>
                <p>${getTotalAmount()==="0.00"?0:2.23}</p>
              </div>
              <div className='cart-total-details'>
                <strong>Total</strong>
                <p>${getTotalAmount()==="0.00"?0:parseFloat(getTotalAmount())+2.23}</p>
              </div>
            </div>
            <button type='submit' className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder