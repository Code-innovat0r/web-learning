import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url, token} = useContext(StoreContext)
    const navigate = useNavigate();

    const verifications = async () => {
        const response = await axios.post(url+'/api/order/verify', {success: success, orderId: orderId})
        if(response.data.success) {
            navigate('/myorders')
        }else{
            navigate('/')
        }
    }

    useEffect(() => {
        verifications()
    }, [])
     

  return (
    <div className='verify'>
        <div className='spinner'>

        </div>
    </div>
  )
}

export default Verify