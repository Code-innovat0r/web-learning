import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar bg-purple-200 flex justify-evenly items-center h-12'>
        <div className='logo '>
            <strong className='italic text-blue-600 text-[23px]'>&lt; Pass<span className='text-cyan-800'>Man</span> /&gt;</strong>
        </div>
      <ul className='flex gap-10'>
        <li className='hover:font-bold'><a href="/">Home</a></li>
        <li className='hover:font-bold'><a href="#">About</a></li>
        <li className='hover:font-bold'><a href="#">Contact</a></li>
        <li><img className='hover:cursor-pointer hover:w-[40px]' width={30} src='/icon/github-mark.svg' alt="github logo" /></li>
      </ul>
    </nav>
  )
}

export default Navbar
