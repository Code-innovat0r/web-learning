import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAtoken, backendUrl} = useContext(AdminContext)
    const {setDoctorToken} = useContext(DoctorContext)


    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        try{
            if(state === 'Admin'){
                const {data}= await axios.post(backendUrl+'/api/admin/login', {email, password})
                if(data.success){
                    toast.success(data.message)
                    //also store in the local storage to not signin again on reload
                    localStorage.setItem('atoken', data.token)
                    setAtoken(data.token)
                }
                else{
                    toast.error(data.message)
                }
            }else{
                const {data}= await axios.post(backendUrl+'/api/doctor/login', {email, password})
                if(data.success){
                    toast.success("Welcome !!")
                    localStorage.setItem('dtoken', data.token)
                    setDoctorToken(data.token)
                }else{
                    toast.error(data.message)
                }
            }
        }catch(e){

        }
    }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            {
                state === 'Admin'
                ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>click here.</span></p>
                : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>click here.</span></p>
            }
        </div>

    </form>
  )
}

export default Login