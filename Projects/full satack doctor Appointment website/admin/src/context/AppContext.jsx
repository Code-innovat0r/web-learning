import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currency = '₹';

    const slotDateFormate = (slotDate) => {
        const dateArray = slotDate.split('-')
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
    }

    const calculateAge = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        const age = today.getFullYear() - birthDate.getFullYear()
        return age;
    }

    const value = {
        calculateAge, slotDateFormate, currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider