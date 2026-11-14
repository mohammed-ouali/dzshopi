import React from 'react'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import HroiSection from './components/HroiSection'
import ServiceFeatures from './components/ServiceFeatures'
import CategorySlider from './components/CategorySlider'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar/>
      <HroiSection/>
      <CategorySlider/>
      <Footer/>
    </div>
  )
}

export default App