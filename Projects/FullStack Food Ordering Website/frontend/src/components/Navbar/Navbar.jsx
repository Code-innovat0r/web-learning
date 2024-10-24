import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setshowLogin}) => {

  const [menu, setMenu]  = useState("home")

  const navigate = useNavigate();

  const {getTotalAmount, token, setToken} = useContext(StoreContext)


  const LogOut = () => {
    setToken("")
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='navbar py-[20px] flex justify-between items-center'>
        <Link to='/'><img src={assets.logo} alt="logo" className='logo w-[150px]' /></Link>
        <ul className="navbar-option flex justify-center items-center gap-[20px] text-[18px] text-[#49557e]">
          {/* If menu=== is true add class active else add nothing */}
           <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
           <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
           <a href='#app-download' onClick={()=>setMenu("modile-app")} className={menu==="modile-app"?"active":""}>modile-app</a>
           <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
        </ul>
        <div className="navbar-right flex justify-center items-center gap-6">
          <img src={assets.search_icon} alt="search"  />
          <div className='navbar-search-icon relative'>
            <Link to='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
            <div className={getTotalAmount()==="0.00"?"":'dot absolute top-[-8px] right-[-7px] bg-[tomato] min-w-[10px] min-h-[10px] rounded-[5px]'}></div>
          </div>
          {/* Only show sign in if there's no token */}
          {!token?<button onClick={()=>{setshowLogin(true)}} className='sign-in text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >Sign in</button>:<div className='navbar-profile cursor-pointer'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>{navigate("/myorders")}}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={()=>{LogOut()}}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
            </ul>
            </div>}
        </div>
    </div>
  )
}

export default Navbar