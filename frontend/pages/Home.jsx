
import CategorySlider from '../src/components/CategorySlider'
import HeroSection from '../src/components/HroiSection'
import SpecialOffers from '../src/components/SpecialOffers'
import NewArrivals from '../src/components/NewArrivals'
import ProductsSection from "../src/components/ProductsSection";



const home = () => {
  return (
    <>
        <HeroSection/>
      <CategorySlider />
      <SpecialOffers />
      <NewArrivals />
      <ProductsSection />
    </>
  )
}

export default home