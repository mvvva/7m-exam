import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navigation";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import Home from "./components/home/Home";
import Aside from "./components/aside/Aside";
import Cart from "./components/cart/Cart";
import ProductDetail from "./components/product/ProductDetail";
import backgroundImage from './assets/images/test.jpg'

export default function App() {
  
  const [sortBy, setSortBy] = useState('');
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <Provider store={store}>
      <Router>
          <Header />
          <Navbar />


        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/sales" 
              element={
                <div>
                    <div 
                      className="header-wrap w-full bg-cover bg-center h-screen"
                      style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center' }}>
                    </div>
                    <div className="filter-wrap flex py-4 px-6 items-center justify-between bg-[#D5F8CF]">
                      <div className="filter font-bold text-[#0BA42D]">Filter by:</div>
                      <div className="sort-by">
                        <select 
                          name="price"
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)} 
                          className="text-[#0BA42D] bg-transparent rounded-lg py-2 focus:outline-none focus:ring-none"
                        >
                          <option value="">Sort by</option>
                          <option value="cheap">Cheap</option>
                          <option value="expensive">Expensive</option>
                        </select>
                      </div>
                    </div>

                  <div className="main-wrapper flex">
                    <Aside
                      selectedBrand={selectedBrand}
                      setSelectedBrand={setSelectedBrand}
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                    />
                    <Main
                      selectedBrand={selectedBrand}
                      selectedColor={selectedColor}
                      sortBy={sortBy}
                    />
                  </div>
                </div>
                } 
              />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
