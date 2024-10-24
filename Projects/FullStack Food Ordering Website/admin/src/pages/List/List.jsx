import React, { useState, useEffect} from 'react'
import './List.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = ({backendUrl}) => {

  const [List, setList] = useState([])

 

  const fetchAll = async () =>{
    const response = await axios.get(`${backendUrl}/api/food/list`)
    if(response.data.success){
      setList(response.data.data)
    }else{

    }
  }

  const removeFood = async (id) => {
    const response = await axios.post(`${backendUrl}/api/food/remove`, {id})
    if(response.data.success){
      toast.success(response.data.message)
      await fetchAll()
    }else{
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item, index) => {
          return(
            <div className="list-table-format" key={index}>
              <img src={`${backendUrl}/images/`+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>{removeFood(item._id)}} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List