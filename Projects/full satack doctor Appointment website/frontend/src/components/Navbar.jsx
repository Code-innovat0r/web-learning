import React, { useContext } from 'react'
import {assets }  from '../assets/assets'
import {NavLink, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const navigate = useNavigate();

    const {token, setToken, UserData, backendUrl} = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false);

    const logOut = () =>{
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo" />
         {/* hidden is for the small width devices, So that the ul is hidden in the small devices  */}
        <ul className='hidden md:flex items-start gap-5 font-medium '> 
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>

        <div className='flex items-center gap-4 '>
            {/* using the ternary operator show login button or not */}
            {
                token? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className='w-8 rounded-full' src={UserData.image?backendUrl+'/images/'+UserData.image:assets.profile_pic} alt="hello" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 x-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-2'>
                                <p onClick={()=>{navigate('/my-profile')}} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={()=>{navigate('/my-appointments')}} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={()=>logOut()} className='hover:text-black cursor-pointer'>LogOut</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={()=>{navigate('/login');}} className={` ${setShowMenu?'px-3 py-2':'px-8 py-3'} bg-primary text-white  rounded-full font-light`}>Create Account</button>
                )
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="" />
            {/* -----------Modile Menu---------- */}
            <div className={` ${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-8 mt-9 px-5 text-[30px] font-semibold'>
                    <NavLink  onClick={()=>{setShowMenu(false)}} to='/'><p  className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                    <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>{setShowMenu(false)}} to='/doctors'><p  className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                    <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>{setShowMenu(false)}} to='/about'><p  className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                    <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>{setShowMenu(false)}} to='/contact'><p  className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar