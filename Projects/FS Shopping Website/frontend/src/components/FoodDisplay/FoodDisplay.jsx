import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'


const FoodDisplay = ({Category}) => {

    // using the food_list from the context folder using the useContext hook
    const {url, food_list} = useContext(StoreContext)

  return (
    <div>
        <h1 className='font-bold text-[23px]'>Top Food item near you</h1>
        <div className='food-display-list'>
          {
            food_list.map((item, index) => {
              if (Category==="All" || Category===item.category) {
                return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}></FoodItem>
              }
            })
          }
        </div>
    </div>
  )
}

export default FoodDisplay