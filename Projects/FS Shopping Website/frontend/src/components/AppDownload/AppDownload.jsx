import React from 'react'
import { assets } from '../../assets/assets'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div id='app-download' className='app-download'>
        <p>For Better Experience Download <br /> <span>Tomato App</span></p>
        <div className='app-download-platform'>
            <img src={assets.play_store} alt="play_store" />
            <img src={assets.app_store} alt="app_store" />
        </div>
    </div>
  )
}

export default AppDownload