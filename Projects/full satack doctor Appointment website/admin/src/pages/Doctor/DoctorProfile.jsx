import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const { doctorToken, profileData, getProfile, backendUrl, setProfileData } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (doctorToken) {
      getProfile()
    }
  }, [doctorToken])


  const updateProfile = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/doctor-profile-update`, { ...profileData }, { headers: { doctorToken } })

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfile()
      }else{
        toast.error("Unable to Update Profile !")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  return profileData && (
    <div>

      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={`${backendUrl}/images/${profileData.image}`} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* Doctor Infornation */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* About Doctor Section */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3 text-neutral-800'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment Fees: <span className='text-red-800'>{currency} {isEdit ? <input type="number" value={profileData.fees} onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} /> : profileData.fees}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p>Address: </p>
            <p className='text-sm'>
              {isEdit ? <input type="text" value={profileData.address.line1} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" value={profileData.address.line2} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} /> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
              ? <button onClick={() => updateProfile()} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }
        </div>

      </div>


    </div>
  )
}

export default DoctorProfile