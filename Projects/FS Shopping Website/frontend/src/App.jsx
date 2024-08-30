import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  // State to track the login status and show/hide the login popup
  const [showLogin, setshowLogin] = useState(false)

  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} />
    {showLogin?<LoginPopup setshowLogin={setshowLogin}/>:<></>}
      <div className="app w-[80%] mx-auto font-[outfit] ">
        <Navbar setshowLogin={setshowLogin}/>
        {/* This will serve the page as per the browser request and the BrowserRouter imported im main.jsx and body is wrapped around */}
        <Routes>
          <Route path='/' element={<Home/>}/>  
          <Route path='/cart' element={<Cart/>}/>  
          <Route path='/placeorder' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>  
          <Route path='/myorders' element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App