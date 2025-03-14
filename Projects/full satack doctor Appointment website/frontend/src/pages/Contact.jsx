import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate } from 'react-router-dom'
const Contact = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 md-28 text-sm'>
        <img className='w-fill md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center item-center gap-6 '>
          <p className='font-semibold text-lg text-gray-600 '>Our Office</p>
          <p className='text-gray-500'>Lorem ipsum dolor,<br />sit amet Lorem, ipsum.</p>
          <p className='text-gray-500'>TEL: (+91) 18007892847</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at Prescripto</p>
          <p onClick={()=>{navigate('/about'); scrollTo(0,0)}} className='text-gray-500 cursor-pointer'>Learn more ABOUT us</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact