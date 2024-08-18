import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaQuestionCircle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0D2612] text-white">
      <div className="wrapper flex h-[50vh]">
        <div className="flex w-full container">

            <div className="flex w-[40%]  p-4 flex-col">
            <div className="flex-1 p-2">
                <h3 className="text-xl font-semibold">GameGeek</h3>
                <p>START YOUR GAME <br />WITH THE BEST</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} className="text-blue-400 hover:text-blue-500" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} className="text-blue-700 hover:text-blue-800" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="text-blue-600 hover:text-blue-700" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="text-pink-500 hover:text-pink-600" />
              </a>
            </div>
            </div>

            <div className="flex w-[60%] p-4">
            <div className="flex-1 p-2">
                <h3 className="text-xl font-semibold">Services</h3>
                <p>Gift Card</p>
                <p>Mobile App</p>
                <p>Shipping & Delivery</p>
                <p>Order Pickup</p>
                <p>Account Signup</p>
            </div>
            <div className="flex-1 p-2">
                <h3 className="text-xl font-semibold">Help</h3>
                <p>ShopCart Help</p>
                <p>Returns</p>
                <p>Track Orders</p>
                <p>Contact Us</p>
                <p>Security & Fraud</p>
            </div>
            <div className="flex-1 p-2">
                <h3 className="text-xl font-semibold">About us</h3>
                <p>News & Blog</p>
                <p>Help</p>
                <p>Press Center</p>
            </div>
            </div>
        </div>
      </div>

      <div className="w-full h-[50px] border-t-2 flex items-center justify-between container py-12 mt-5">

        <p className="text-sm">GG</p>
        <p className="text-sm flex items-center gap-2"><FaQuestionCircle size={24} className="text-gray-600 hover:text-gray-500" /> Help center</p>
        <p className="text-sm">Privacy & Policy</p>
        <p className="text-sm">Terms of Service</p>
        <p className="text-sm">All rights reserved by GameGeek | 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
