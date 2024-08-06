import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-purple-200 flex justify-evenly items-center h-12'>
            <div className='logo '>
                <strong className='italic text-blue-600 text-[23px]'>&lt; Pass<span className='text-cyan-800'>Man</span> /&gt;</strong>
            </div>
            <div className='flex items-center'>
                <span className="material-symbols-outlined">
                    copyright
                </span>&nbsp; 2019 Created with love By Paras
            </div>
        </footer>
    )
}

export default Footer