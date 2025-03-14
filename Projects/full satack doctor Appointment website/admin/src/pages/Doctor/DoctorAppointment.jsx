import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const DoctorAppointment = () => {

  const { backendUrl, doctorToken, getAppointment, appointments, updateAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext)

  useEffect(() => {
    if (doctorToken) {
      getAppointment()
    }
  }, [doctorToken])

  

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={`${backendUrl}/images/${item.userData.image}`} alt="" /><p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment ? 'online' : 'CASH'}
                </p>
              </div>
              <p className='max-sm:hidden'>
                {calculateAge(item.userData.dob)}
              </p>
              <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled 
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.Visited 
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <div className='flex'>
                    <img onClick={()=>updateAppointment(1, item._id)} className='w-10 cursor-pointer ' src={assets.cancel_icon} alt="" />
                    <img  onClick={()=>updateAppointment(2, item._id)} className='w-10  cursor-pointer ' src={assets.tick_icon} alt="" />
                  </div>          
              }
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default DoctorAppointment