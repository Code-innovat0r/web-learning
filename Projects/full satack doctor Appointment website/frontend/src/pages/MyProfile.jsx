import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets'
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {

  const {UserData, setUserData, backendUrl, token, fetchUserProfile} = useContext(AppContext)

  const [profileImage, setProfileImage] = useState(false)

  const [isEdit, setisEdit] = useState(false)

  const handleEdit = async () => {
    try{
      const formdata = new FormData();
      formdata.append('name', UserData.name);
      formdata.append('phone', UserData.phone);
      formdata.append('address', JSON.stringify(UserData.address));
      formdata.append('gender', UserData.gender);
      formdata.append('dob', UserData.dob);
      formdata.append('img', UserData.image);
      //If you don't make any change in the image then it fill defaultly false and not added in the updation process
      profileImage && formdata.append('image', profileImage);

      // updateUserProfile(formdata);

      const {data} = await axios.post(backendUrl+'/api/user/update-profile', formdata, {headers:{token}})

      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }

      setProfileImage(false)
      setisEdit(false)
      fetchUserProfile()
    }catch(err){
      console.log(err)
      toast.error(err)
    }
  }

  return UserData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit ?
        <label htmlFor='profileImage'>
          <div className='inline-block relative cursor-pointer' >
            <img className='w-36 rounded opacity-75' src={profileImage? URL.createObjectURL(profileImage):backendUrl+'/images/'+UserData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={profileImage ? '': assets.upload_icon} alt="" />
          </div>
          <input type="file" id='profileImage' onChange={(e)=>setProfileImage(e.target.files[0])} hidden />
        </label>
        :<img className='w-36 rounded' src={UserData.image?backendUrl+'/images/'+UserData.image:assets.profile_pic} alt="profile" />
      }
      
      {
        isEdit? <input className='bg-gray-50 test-3xl font-medium max-w-60 mt-4 ' type="text" value={UserData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))} />
        : <p className='font-medium test-3xl text-neutral-800 mt-4'>{UserData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div>
        <p className='text-neutral-500 underline mt-4'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email:</p>
          <p className='text-blue-500 underline'>{UserData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit? <input type="text" className='bg-gray-100 max-w-52' value={UserData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} />
            : <p className='text-blue-400'>{UserData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit ? 
              <p>
              <input className='bg-gray-50' type="text" value={UserData.address.line1} onChange={(e) => setUserData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} />
              <br />
              <input className='bg-gray-50' type="text" value={UserData.address.line2} onChange={(e) => setUserData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))} />
              </p>
            : <p className='text-gray-500'>{UserData.address.line1}
              <br />
              {UserData.address.line2}</p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
            {
              isEdit? 
              <select className='max-w-20 bg-gray-100' value={UserData.gender} onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              : <p className='text-gray-400'>{UserData.gender}</p>
            }
          <p className='font-medium'>Birthday:</p>
            {
              isEdit? <input className='max-w-28 bg-gray-100' type="date" value={UserData.dob} onChange={(e) => setUserData(prev => ({...prev,dob:e.target.value}))} />
              : <p className='text-gray-400'>{UserData.dob}</p>
            }
          
        </div>
      </div>
      <div>
        {isEdit? 
          <button className='border bg-blue-700 px-8 py-2 my-4 rounded-full text-white hover:text-blue-700 hover:bg-white' onClick={handleEdit}>Save information</button>
          : <button className='border bg-blue-700 px-8 py-2 my-4 rounded-full text-white hover:text-blue-700 hover:bg-white' onClick={()=>setisEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile