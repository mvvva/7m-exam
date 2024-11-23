import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Cart from "./components/cart/Cart";
import ProductDetail from "./components/ProductDetail";
import Sales from "./pages/sales";

export default function App() {

  return (
    <Provider store={store}>
      <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
      </Router>
    </Provider>
  );
}
