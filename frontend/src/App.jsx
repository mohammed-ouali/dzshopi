import React from 'react'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import HroiSection from './components/HroiSection'
import ServiceFeatures from './components/ServiceFeatures'
import CategorySlider from './components/CategorySlider'
import SpecialOffers from './components/SpecialOffers'
import NewArrivals from './components/NewArrivals'
import ProductsSection from './components/ProductsSection'
const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar/>
      <HroiSection/>
      <CategorySlider/>
      <SpecialOffers/>
       <NewArrivals/> 
       <ProductsSection/>     
      <Footer/>
    </div>
  )
}

export default App