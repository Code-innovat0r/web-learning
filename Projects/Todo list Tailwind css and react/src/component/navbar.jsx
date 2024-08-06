import React from 'react'

const Navbar = () =>{
    return(
        <nav className="bg-pink-400 h-12 ">
            <div className='flex justify-between h-[100%] items-center w-[80%] mx-auto'>
                <div className='logo'>
                    <strong className='text-pink-50 text-[25px]'>iTask</strong>
                </div>
                <div className='flex gap-8 text-pink-50 text-[18px] font-[600]'>
                    <span className='cursor-pointer hover:text-purple-500 transition-all duration-500'>Home</span>
                    <span className='cursor-pointer hover:text-purple-500 transition-all duration-500'>Feedback</span>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
