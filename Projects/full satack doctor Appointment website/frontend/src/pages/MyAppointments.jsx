import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {

  const {backendUrl, token, doctorList} = useContext(AppContext)
  const [doctors, setDoctors] = useState([])

  const navigate = useNavigate()

  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split('-')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
  }

  const appointmentList = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/list-appointment`, {headers: {token}});
      if(data.success){
        setDoctors(data.data);
      } else{
        toast.error("Unable to Fetch Data Appointments!")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  } 
  
  const cancelAppointment = async (id, userId) =>{
    try{
      const {data} = await axios.post(`${backendUrl}/api/user/update-appointment`, {id, userId}, {headers: {token}});
      if(data.success){
        toast.success(data.message)
        appointmentList()
        doctorList()
      } else{
        toast.error(data.message)
      }
    }catch(err){
      console.error(err)
      toast.error("err.message")
    }
  }

  const intiPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      name: "Appointment Payment",
      description: "Apointment Payment",
      receipt: order.receipt,
      handler: async (response)=>{
        try {
          const {data} = await axios.post(backendUrl+"api/user/verify-payment", response, {headers: {token}});
          if(data.success){
            appointmentList()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.error(err)
          toast.error(err.message)
        }
      }
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const appointmentPayment = async (appointmentId) =>{
    try{
      const {data} = await axios.post(`${backendUrl}/api/user/payment`, {appointmentId}, {headers: {token}});
      if(data.success){
        intiPay(data.order)
      } else{
        toast.error(data.message)
      }
    }catch(err){
      console.error(err)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if(token){
      appointmentList()
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {
          doctors.map((item, index)=>(
            <div className='grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={backendUrl+'/images/'+item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address: </p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span> {slotDateFormate(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div>

          
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && !item.Visited && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && !item.payment && !item.Visited && <button onClick={()=>appointmentPayment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-700 hover:text-white transition-all duration-300'>Pay Online</button>}
                {!item.cancelled && !item.Visited && <button onClick={()=>{cancelAppointment(item._id, item.userId)}} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
                {item.cancelled && !item.Visited && <button className='sm:min-w-48 py-2 border rounded text-red-500 border-red-500'>Appointment Cancelled</button>}
                {item.Visited && <button className='sm:min-w-48 py-2 border rounded text-green-500 border-green-500'>Completed</button>}
              </div> 
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments