import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { token, setToken, backendUrl } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        console.log(name + ' ' + password + ' ' + email)
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Error signing up/logging in')
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    } else { navigate('/login') }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center '>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'Sign Up' : 'Log-in'} to book an appointment.</p>
        {state === "Sign Up" ?
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          : ""
        }
        <div className='w-full'>
          <p>Email Address</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button type='submit' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign Up' ?
            <p className='text-sm'>Already have an account? <span className='cursor-pointer underline text-blue-600' onClick={() => setState('Login')}> Log-in</span></p>
            :
            <p className='text-sm'>Don't have an account? <span className='cursor-pointer underline text-blue-600' onClick={() => setState('Sign Up')}>Sign Up</span></p>
        }
      </div>


    </form>
  )
}

export default Login