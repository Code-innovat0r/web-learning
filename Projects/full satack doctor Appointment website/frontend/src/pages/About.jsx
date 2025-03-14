import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 justify-center'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum explicabo fugiat obcaecati incidunt aut hic, deleniti ad culpa omnis exercitationem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quibusdam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, hic nulla illum alias dolorum, possimus minima natus culpa accusamus in modi iste architecto, doloribus corporis repudiandae sit eligendi beatae impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, saepe!</p>
          <b className='text-gray-800'>Our Values</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero hic veritatis, sint itaque modi quo iste repudiandae dolore ipsam? Saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quibusdam.</p>
        </div>
      </div>

      <div className='text-xl my-4 mt-28'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all daration-300 text-gray-600 cursor-pointer'>
          <b>Loremeww</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, esse.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all daration-300 text-gray-600 cursor-pointer'>
          <b>loremerw</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, odit!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all daration-300 text-gray-600 cursor-pointer'>
          <b>Loremghr</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, veritatis.</p>
        </div>
      </div>

    </div>
  )
}

export default About