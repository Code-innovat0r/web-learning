import { createContext, useState } from "react";
import { toast } from "react-toastify"
import axios from "axios"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [appointments, setAppointments] = useState([])
    const [doctorDash, setDoctorDash] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointment = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/doctor-appointment`, { headers: { doctorToken } })
            if (data.success) {
                setAppointments(data.appointment.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDoctorDash = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/doctor-dashboard`, {}, { headers: { doctorToken } })
            if (data.success) {
                setDoctorDash(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfile = async () =>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/doctor-profile`, { headers: { doctorToken } })
            if(data.success){
                setProfileData(data.profile)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const updateAppointment = async (command, appointmentId) => {
        try {
            let response;
            if (command === 1) {
                const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { doctorToken } })
                response = data;
            } else {
                const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, { headers: { doctorToken } })
                response = data;
            }
            getAppointment()
            getDoctorDash()
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to Update")
        }
    }

    const value = {
        doctorToken,
        setDoctorToken,
        backendUrl,
        getAppointment,
        appointments,
        getDoctorDash,
        doctorDash,
        updateAppointment,
        getProfile,
        profileData,
        setProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider