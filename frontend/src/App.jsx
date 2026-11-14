import React from 'react'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import HroiSection from './components/HroiSection'
import ServiceFeatures from './components/ServiceFeatures'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar/>
      <HroiSection/>
      <Footer/>
    </div>
  )
}

export default App