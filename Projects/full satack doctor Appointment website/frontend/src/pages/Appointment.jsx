import React, { useContext, useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/relatedDoctors';
import {toast} from 'react-toastify'
import axios from 'axios';

const Appointment = () => {

  const {docId} = useParams();
  const {doctors, currencySymbol, backendUrl,doctorList,token} = useContext(AppContext);
  const navigate = useNavigate();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat'];
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [docInfo , setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime , setSlotTime] = useState("");

  const fetchDocInfo = () =>{
    setDocInfo(doctors.find(d => d._id === docId));
  }

  const getAvailableSlot = async () =>{
    setDocSlot([]);

    //  getting the current date
    let today = new Date();
    //now by using the today let calculate the 7 day from today
    for(let i = 0; i<7 ; i++){
      //getting date with the index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting the end time of the date with index
      let endtime = new Date();
      endtime.setDate(today.getDate()+i);
      endtime.setHours(21,0,0,0); // set the end time of the date to 12 pm

      //setting the hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() +1 :10)
        currentDate.setMinutes(currentDate.getMinutes() >30 ?30:0);
      }else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeslot = [];

      while(currentDate < endtime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}).slice(0, 5);

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day + '-' + month + '-' + year
        const slotTime = formattedTime
        // console.log(docInfo.slots_booked)
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        //add the slot to the array
        if (isSlotAvailable){
          timeslot.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        //Increment the current time with the 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot(prev => ([...prev, timeslot]));
    }
  }


  //API to book Appointment
  const bookAppointment = async () => {
    if(!token){
      toast.warn('Please Signin First');
      return navigate('/login');
    }

    try {
      const date = docSlot[slotIndex][0].datetime
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();

      const slotDate  = day+'-'+month+'-'+year

      if(!slotDate || !slotTime){
        toast.warn('Please select date and time');
        return;
      }

      const {data} = await axios.post(backendUrl+'/api/user/book-appointment',{docId, slotDate,slotTime}, {headers:{token}})
      if(data.success){
        toast.success(data.message)
        doctorList()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(()=>{
    getAvailableSlot();
  }, [docInfo])

  return docInfo && (   // && is a operator that check docInfo have some value then only return this;
    <div>
      {/* ----------- Doctor Detail -------------------- */}
      <div className='flex flex-col sm:flex-row gap-4 font-semibold'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={backendUrl+'/images/'+docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* -------------- Doc Info ------------------------ */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* ------------ Doctor About --------------  */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appontment Fee: <span className='text-gray-600'>&nbsp;{currencySymbol} {docInfo.fees}</span></p>
        </div>

      </div>


      {/* ------------- Booking slot ------------------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'> 
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlot.length && docSlot.map((item, index) =>(
              <div onClick={()=>{setSlotIndex(index)}} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex == index ? 'bg-primary text-white' : 'border border-gray-200' }`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot[slotIndex].map((item, index) =>(
            <p onClick={()=>{setSlotTime(item.time)}} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time == slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-200' }`}>
              {item.time.toLowerCase()}
            </p>
          ))};
        </div>
        
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>
          Book an Appointment
        </button>

      </div>

      

      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment