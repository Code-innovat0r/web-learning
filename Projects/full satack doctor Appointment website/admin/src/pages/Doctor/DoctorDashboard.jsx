import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { getDoctorDash, doctorToken, doctorDash, backendUrl, updateAppointment } = useContext(DoctorContext)

  const { slotDateFormate, currency } = useContext(AppContext)

  useEffect(() => {
    if (doctorToken) {
      getDoctorDash()
    }
  }, [doctorToken])


  return doctorDash && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {doctorDash.earning}</p>
            <p className='text-gray-400 '>Earning</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{doctorDash.appointments}</p>
            <p className='text-gray-400 '>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{doctorDash.patients}</p>
            <p className='text-gray-400 '>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          < img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        {
          doctorDash.latestAppointment.map((item, index) => (
            <div className='flex justify-between px-2 py-2 hover:bg-gray-50' key={index}>
              <div className='flex gap-3'>
                <img className='w-12 rounded-full' src={`${backendUrl}/images/${item.userData.image}`} alt="image" />
                <div>
                  <p className='text-sm font-medium'>{item.userData.name}</p>
                  <p className='text-sm font-medium'>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
                </div>
              </div>
              <div>
                {
                  item.cancelled
                    ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                    : item.Visited
                      ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                      : <div className='flex'>
                        <img onClick={() => updateAppointment(1, item._id)} className='w-10 cursor-pointer ' src={assets.cancel_icon} alt="" />
                        <img onClick={() => updateAppointment(2, item._id)} className='w-10  cursor-pointer ' src={assets.tick_icon} alt="" />
                      </div>
                }
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default DoctorDashboard