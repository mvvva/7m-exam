import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaQuestionCircle } from 'react-icons/fa';

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
    <footer className="w-full bg-[#0D2612] text-white font-primary-font">
      <div className="wrapper flex h-[50vh]">
        <div className="flex w-full container mx-auto">
          <div className="flex w-[40%] p-4 flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">GameGeek</h3>
              <p className="text-lg font-semibold text-green-400">
                START YOUR GAME <br />WITH THE BEST
              </p>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map(({ Icon, href, color }) => (
                <a 
                  key={href} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`transition-colors duration-300 ${color}`}
                >
                  <Icon size={28} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex w-[60%] p-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex-1 p-2">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                {links.map(({ label, to }) => (
                  <Link 
                    key={label} 
                    to={to} 
                    className="block text-gray-300 hover:text-green-400 mb-2 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full border-t border-gray-700 py-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">GG</Link>
          
          <div className="flex items-center space-x-4 text-sm">
            <Link to="/" className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
              <FaQuestionCircle size={20} /> 
              Help Center
            </Link>
            <Link to="/" className="hover:text-green-400 transition-colors duration-300">
              Privacy & Policy
            </Link>
            <Link to="/" className="hover:text-green-400 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
          
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} GameGeek. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;