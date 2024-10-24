import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';
import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const [data, setData] = useState([])

    const { url, token } = useContext(StoreContext)

    const fetchOreders = async (req, res) => {
        const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } })
        if (response.data.success) {
            setData(response.data.data)
        } else {
            console.log('Error getting orders')
        }
    }

    useEffect(() => {
        if (token) {
            fetchOreders()
        }
    }, [token]);

    const pay = (bool) =>{
        if(bool){
            return "Done!"
        }else{
            return "Not Done!"
        }
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((orders, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="parcel" />
                            <p>{orders.items.map((item, index) =>{
                                if(index === orders.items.length-1) {
                                    return item.name + ' X ' + item.quantity
                                }else{
                                    return item.name + ' X ' + item.quantity + " , "
                                }
                            })}</p>
                            <p>${orders.amount}</p>
                            <p>Items: {orders.items.length}</p>
                            <p><span>&#x25cf;&ensp;</span><b>{orders.status}</b></p>
                            <p><b>Payment Status</b>:&ensp;{pay(orders.payment)}</p>
                            <button onClick={()=>{fetchOreders()}} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders