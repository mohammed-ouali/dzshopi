import Navbar from './components/NavBar'
import Footer from './components/Footer'
import HroiSection from './components/HroiSection'
import CategorySlider from './components/CategorySlider'
import SpecialOffers from './components/SpecialOffers'
import NewArrivals from './components/NewArrivals'
import ProductsSection from './components/ProductsSection'
import BestDeals from '../pages/BestDeals'
const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar/>
     <BestDeals/>
      <Footer/>
    </div>
  )
}

export default App