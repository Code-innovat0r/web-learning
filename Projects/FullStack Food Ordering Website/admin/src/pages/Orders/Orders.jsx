import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets'

const Orders = ({ backendUrl }) => {

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Food Processing");

  // fetch orders from backend API
  const getOrders = async () => {
    const response = await axios.post(`${backendUrl}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data)
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const updateStatus = async (event, id) => {
    const response = await axios.post(`${backendUrl}/api/order/updatestatus`, {id: id, status: event.target.value})
    if(response.data.success) {
      toast.success(response.data.message)
      getOrders()
    }
  }

  return (
    <div className='order add'>
      <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity
                  } else {
                    return item.name + " X " + item.quantity
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName}<span>&nbsp;</span>{order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street+", "}</p>
                <p>{order.address.city + ", "+ order.address.state+", "+order.address.country+", "+ order.address.zipCode}</p>
              </div>
              <p className="order-item-phone">Phone: {" "+order.address.phone}</p>
            </div>
            <p>Items:{" "+order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>{updateStatus(event, order._id)}} className='order-item-select'>
              <option value="Food Processing">Food Processing</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders