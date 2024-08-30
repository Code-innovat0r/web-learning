import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({Category, setCategory}) => {
  return (
    <div id='explore-menu' className='explore-menu flex flex-col gap-[20px] my-16'>
        <h1 className='font-bold text-[2vw] text-[#696666]'>Explore our menu</h1>
        <p className='explore-menu-text w-[66%]'> Choose from a diverse menu featuring a delecated array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your carvings elevate you dining experience, one delecious meal at a time.</p>
        <div className="explore-menu-list scroll-content my-[20px] flex gap-[30px] items-center justify-between text-center">
            {
                menu_list.map((item, index)=>{
                    return (
                        <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} key={index} className='explore-menu-list-item cursor-pointer'>
                            <img className={Category===item.menu_name?"active":""} src={item.menu_image} alt="img" />
                            <p className='mt-3 text-slate-500 font-[800]' >{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu