import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaQuestionCircle, FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';

// Footer Component
const Footer = () => {
  const socialLinks = [
    { Icon: FaTwitter, href: "https://twitter.com", color: "text-blue-400 hover:text-blue-500" },
    { Icon: FaLinkedin, href: "https://linkedin.com", color: "text-blue-700 hover:text-blue-800" },
    { Icon: FaFacebook, href: "https://facebook.com", color: "text-blue-600 hover:text-blue-700" },
    { Icon: FaInstagram, href: "https://instagram.com", color: "text-pink-500 hover:text-pink-600" }
  ];

  const footerLinks = {
    Services: [
      { label: "Gift Card", to: "/" },
      { label: "Mobile App", to: "/" },
      { label: "Shipping & Delivery", to: "/" },
      { label: "Order Pickup", to: "/" },
      { label: "Account Signup", to: "/" }
    ],
    Help: [
      { label: "ShopCart Help", to: "/" },
      { label: "Returns", to: "/" },
      { label: "Track Orders", to: "/" },
      { label: "Contact Us", to: "/" },
      { label: "Security & Fraud", to: "/" }
    ],
    About: [
      { label: "News & Blog", to: "/" },
      { label: "Help Center", to: "/" },
      { label: "Press Center", to: "/" }
    ]
  };

  return (
    <footer className="w-full bg-[#0D2612] text-white">
      <div className="wrapper min-h-[400px] lg:h-[50vh]">
        <div className="flex flex-col lg:flex-row w-full container mx-auto p-4">
          {/* Logo and Social Section */}
          <div className="w-full lg:w-[40%] mb-8 lg:mb-0">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-xl lg:text-2xl font-bold mb-4">GameGeek</h3>
              <p className="text-base lg:text-lg font-semibold text-green-400">
                START YOUR GAME <br />WITH THE BEST
              </p>
            </div>
            <div className="flex space-x-4 lg:space-x-6 mt-4 lg:mt-8">
              {socialLinks.map(({ Icon, href, color }) => (
                <a 
                  key={href} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`transition-colors duration-300 ${color}`}
                >
                  <Icon size={24} className="lg:text-2xl" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-4 w-full lg:w-[60%]">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex-1">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">{title}</h3>
                {links.map(({ label, to }) => (
                  <Link 
                    key={label} 
                    to={to} 
                    className="block text-sm lg:text-base text-gray-300 hover:text-green-400 mb-2 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="w-full border-t border-gray-700 py-4 lg:py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-base lg:text-lg font-bold">GG</Link>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs lg:text-sm">
            <Link to="/" className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
              <FaQuestionCircle size={16} className="lg:text-xl" /> 
              Help Center
            </Link>
            <Link to="/" className="hover:text-green-400 transition-colors duration-300">
              Privacy & Policy
            </Link>
            <Link to="/" className="hover:text-green-400 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
          
          <p className="text-xs lg:text-sm text-gray-400">
            © {new Date().getFullYear()} GameGeek. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;