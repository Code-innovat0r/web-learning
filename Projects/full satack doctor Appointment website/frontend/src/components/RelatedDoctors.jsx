import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId, speciality}) => {

    const {doctors, backendUrl} = useContext(AppContext)

    const navigate = useNavigate()

    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        // Fetching related doctors based on the given speciality
        if(speciality && doctors.length > 0) {
            const docData = doctors.filter(doc => doc.speciality === speciality && doc._id!== docId);
            setRelDoc(docData);
        }
    }, [docId, speciality, doctors])


  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='text-sm text-center sm:w-1/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus excepturi Lorem ipsum dolor sit amet.</p>
        <div className='grid lg:grid-cols-auto sm:grid-cols-3 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {
                // top 10 doctors of the array
                relDoc.slice(0, 5).map((doctor, index) => (
                    <div onClick={()=>{navigate(`/appointment/${doctor._id}`); scrollTo(0,0);}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img className='bg-blue-50' src={backendUrl+'/images/'+doctor.image} alt="" />
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
        {/* add scroll-smooth class in the main html to see the effect of the scrollTo(0,0) */}
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0);}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:text-[18px]'>more</button>
    </div>
  )
}

export default RelatedDoctors