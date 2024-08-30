import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const backendUrl = 'http://localhost:4000';

  return (
    <>
     <ToastContainer position="top-right" autoClose={5000} />
      {/* Navigation Bar */}
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
       <Routes>
         <Route path='/add' element={<Add backendUrl={backendUrl}/>} />
         <Route path='/list' element={<List backendUrl={backendUrl}/>} />
         <Route path='/orders' element={<Orders backendUrl={backendUrl}/>} />
       </Routes>
      </div>
      <hr />
      <Footer />
    </>
  )
}

export default App