import { useState } from 'react'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/Footer'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar />
     <Manager/>
     <Footer/>
    </>
  )
}

export default App
