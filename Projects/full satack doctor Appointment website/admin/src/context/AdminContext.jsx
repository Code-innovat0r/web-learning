import { createContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

  const [atoken, setAtoken] = useState(localStorage.getItem("atoken") ? localStorage.getItem("atoken") : '')
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState([])

  const [appointments, setAppointments] = useState([])
  const [dasDatas, setDasData] = useState(false)

  const getAllDoctor = async (req, res) => {
    try {
      // fetch all doctor data from backend, {data} says from the response give the row named data
      const { data } = await axios.post(backendUrl + '/api/admin/doctor-list', {}, { headers: { atoken } })
      if (data.success) {
        setDoctors(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  const updateDoctorAvailability = async (doctorId, status) => {
    try {
      const response = await axios.post(backendUrl + '/api/admin/doctor-available', { doctorId, status }, { headers: { atoken } })
      if (response.data.success) {
        getAllDoctor() //update the state with the new data
        toast.success(response.data.message)
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Failed to update doctor availability')
    }
  }

  //get all the appointment 
  const getAllAppointment = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers: {atoken}});
      if(data.success){
        setAppointments(data.data)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(err)
    }
  }

  const cancelAppointment = async (id, userId) => {
    const {data} = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, {id, userId}, {headers:{atoken}})
    if(data.success){
      toast.success(data.message)
      getAllAppointment()
    }else{
      toast.error(data.message)
    }
  }

  const getDasData = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/admin/dashboard`, {headers:{atoken}})
      if(data.success){
        setDasData(data.dasData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    atoken,
    setAtoken,
    backendUrl,
    getAllDoctor,
    doctors,
    updateDoctorAvailability,
    getAllAppointment,
    setAppointments,
    appointments,
    cancelAppointment,
    getDasData,
    dasDatas
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}

    </AdminContext.Provider>
  )

}

export default AdminContextProvider