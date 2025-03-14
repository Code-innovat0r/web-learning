import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'



export const AppContext = createContext()

const AppContextProvider = (props) => {
    
    const currencySymbol = '₹';

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [UserData, setUserData] = useState(false)

    //function to fetch the doctor list from the server
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

    const doctorList = async () => {
        try{
            const {data} = await axios.get(`${backendUrl}/api/doctor/list`)
            if(data.success){
                toast.success(data.message)
                setDoctors(data.data)
            }
            else{
                toast.error(data.message)
            }
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

    //fetch the user Profile data
    const fetchUserProfile = async () =>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/user/profile`,{},{headers:{token}})
            if(data.success){
                setUserData(data.user)
                toast.success(data.message)
            }else{
                toast.error(data.message)
        }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        
    }

    
    useEffect(() => {
        doctorList()
    }, [])

    useEffect(() => {
        if(token){
            fetchUserProfile()
        }else{
            setUserData(false)
        }
    }, [token])

    const value = {
        doctors,
        currencySymbol,
        backendUrl,token,
        setToken,UserData,setUserData, fetchUserProfile,doctorList
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;