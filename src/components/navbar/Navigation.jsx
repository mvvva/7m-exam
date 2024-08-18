import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
    className={` py-5 px-10 w-full fixed z-[999] top-14 transition-all duration-300 ${
      isScrolled ? 'bg-white/40  backdrop-blur-sm text-black' : 'text-white'
    }`}
    
    >
      <div className="container flex justify-around items-center">
      <Link to="/" className="">GAMEGEEK</Link>
        <div className="nav-wrap flex flex-1 justify-center">
          <nav className="flex items-center space-x-4">
            <ul className="flex items-center space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-400">Home</Link>
              </li>
              <li>
                <Link to="/sales" className="hover:text-gray-400">Sales</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="actions flex items-center space-x-4">
          <Link to="/" className="">
            <FaSearch size={20} />
          </Link>
          <Link to="/" className="">
            <FaUser size={20} />
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="" size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
