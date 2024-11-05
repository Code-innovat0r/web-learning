import React, { useContext, useState, useEffect } from 'react'
import {useNavigate , useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {

  const {speciality} = useParams();
  const [filterDoc, setfilterDoc] = useState([]);
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext)

  const applyFilter = (speciality) =>{
    if(speciality){
      setfilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setfilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter(speciality);
  }, [speciality, doctors])

  return (
    <div>
      <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-md text-gray-800'>
          <p onClick={()=> {speciality === "General physician" ? navigate('/doctors') : navigate('/doctors/General physician')}} className={`w-[94vw] sm:w-[14vw] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician"?'bg-indigo-50 text-black' : ''}`}>General physician</p>
          <p onClick={()=> {speciality === "Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist')}} className={`w-[94vw] sm:w-[14vw] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist"?'bg-indigo-50 text-black' : ''}`}>Gynecologist</p>
          <p onClick={()=> {speciality === "Dermatologist" ? navigate('/doctors') : navigate('/doctors/Dermatologist')}} className={`w-[94vw] sm:w-[14vw] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist"?'bg-indigo-50 text-black' : ''}`}>Dermatologist</p>
          <p onClick={()=> {speciality === "Pediatricians" ? navigate('/doctors') : navigate('/doctors/Pediatricians')}} className={`w-[94vw] sm:w-[14vw] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians"?'bg-indigo-50 text-black' : ''}`}>Pediatricians</p>
          <p onClick={()=> {speciality === "Neurologist" ? navigate('/doctors') : navigate('/doctors/Neurologist')}} className={`w-[94vw] sm:w-[14vw] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist"?'bg-indigo-50 text-black' : ''}`}>Neurologist</p>
          <p onClick={()=> {speciality === "Gastroenterologist" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}} className={`w-[94vw] sm:w-[14vw] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist"?'bg-indigo-50 text-black' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-4 gap-4 gap-y-6'>
          {
            filterDoc.map((doctor, index) => (
              <div onClick={()=>navigate(`/appointment/${doctor._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                  <img className='bg-blue-50' src={doctor.image} alt="" />
                  <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                          <p className='w-[5px] h-[5px] bg-green-500 rounded-full'></p><p>Available</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                      <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors