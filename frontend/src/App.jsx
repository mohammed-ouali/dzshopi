
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import BestDeals from "../pages/BestDeals";
import Products from "../pages/Products";
import  Home  from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Wishlist from "../pages/Wishlist";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Cart from "../pages/Cart";


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">

        <Navbar />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/best-deals" element={<BestDeals />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/settings" element={<Settings/>} />
           <Route path="/cart" element={<Cart/>} />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;
