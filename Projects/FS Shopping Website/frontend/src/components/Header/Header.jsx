import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header relative bg-[url('/header_img.png')] h-[32vw] my-[15px] bg-contain bg-no-repeat">
        <div className="header-content absolute flex flex-col gap-[1.5vw] max-w-[50%] items-start bottom-[15%] left-[10%]">
            <h2 className='text text-[4vw] w-[101%] text-white'>Order your's favourite food here..!</h2>
            <p className='text-white text-[1vw]'>Choose from a diverse menu featuring a delecated array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your carvings elevate you dining experience, one delecious meal at a time.</p>
            <button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><a href='#explore-menu'>View Menu</a></button>
        </div>
    </div>
  )
}

export default Header