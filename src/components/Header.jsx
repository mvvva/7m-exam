import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('English');
    const cartItems = useSelector((state) => state.cart.items);
    const location = useLocation();

    const languages = [
        { 
            code: 'uz', 
            name: 'Uzbek',
            flag: 'https://avatars.mds.yandex.net/get-entity_search/1783226/489314520/S600xU_2x'
        },
        { 
            code: 'en', 
            name: 'English',
            flag: 'https://avatars.mds.yandex.net/get-entity_search/7798118/655254308/S600xU_2x'
        },
        { 
            code: 'ru', 
            name: 'Russian',
            flag: 'https://avatars.mds.yandex.net/get-entity_search/69916/81767251/S600xU_2x'
        }
    ];
    const navLinks = [
        { path: '/', label: 'HOME' },
        { path: '/sales', label: 'SALES' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const selectedLanguage = languages.find(lang => lang.name === selectedLang);

    return (
        <>
            {/* Top Header */}
            <header className="bg-[#0D2613] text-white fixed w-full z-[1000] top-0 font-sans">
                <nav className="mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Mobile Top Bar */}
                    <div className="flex justify-between items-center h-12 md:hidden">
                        <div className="flex items-center space-x-2">
                            <Phone className="text-green-500 w-4 h-4" />
                            <Link 
                                to="tel:+490404995"
                                className="hover:text-green-500 transition-colors duration-300 text-sm"
                            >
                                +4904-049-950
                            </Link>
                        </div>
                        <Link
                            to="/sales"
                            className="text-sm hover:text-green-500 transition-colors duration-300"
                        >
                            Get 50% Off
                        </Link>
                    </div>

                    {/* Desktop Top Bar */}
                    <div className="hidden md:flex justify-between items-center h-14">
                        <div className="flex items-center space-x-6">
                            <div className="text-2xl font-bold">
                                <Link to="/" className="hover:text-green-500 transition-colors duration-300">
                                    GG
                                </Link>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="text-green-500 w-5 h-5" />
                                <Link 
                                    to="/"
                                    className="hover:text-green-500 transition-colors duration-300 text-sm"
                                >
                                    +4904-049-950
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center space-x-4">
                            <Link
                                to="/sales"
                                className="text-sm hover:text-green-500 transition-colors duration-300"
                            >
                                Get 50% Off on Selected Items
                            </Link>
                            <Link
                                to="/sales"
                                className="text-sm border-l-2 border-gray-600 pl-4 hover:text-green-500 transition-colors duration-300"
                            >
                                Shop Now
                            </Link>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center justify-between w-32 bg-[#1a3821] px-3 py-2 rounded hover:bg-[#234729] transition-colors duration-300"
                            >
                                <span className="flex items-center space-x-2">
                                    <img 
                                        src={selectedLanguage.flag} 
                                        alt={`${selectedLanguage.name} flag`}
                                        className="w-5 h-5 rounded-full object-cover"
                                    />
                                    <span className="text-sm">{selectedLang}</span>
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {langOpen && (
                                <div className="absolute top-full right-0 mt-2 w-36 bg-[#1a3821] rounded-md shadow-lg overflow-hidden">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setSelectedLang(lang.name);
                                                setLangOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-[#234729] transition-colors duration-300 flex items-center space-x-2"
                                        >
                                            <img 
                                                src={lang.flag} 
                                                alt={`${lang.name} flag`}
                                                className="w-5 h-5 rounded-full object-cover"
                                            />
                                            <span className="text-sm">{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Navigation */}
            <header className={`fixed w-full z-[999] top-12 md:top-14 transition-all duration-300 text-white font-sans
                ${isScrolled ? 'bg-green-800/30 backdrop-blur-[8px] border-white/10 py-2' : 'bg-green-800/20 py-3'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="text-lg md:text-xl font-semibold tracking-wider">
                            GAMEGEEK
                        </Link>

                        <div className="hidden md:flex flex-1 justify-center">
                            <nav>
                                <ul className="flex items-center space-x-8">
                                    {navLinks.map((link) => (
                                        <li key={link.path}>
                                            <Link 
                                                to={link.path} 
                                                className={`transition-all duration-300 text-sm font-medium uppercase
                                                    ${location.pathname === link.path 
                                                        ? 'text-green-400 border-b-2 border-green-400 pb-1' 
                                                        : 'hover:text-green-300 hover:border-b-2 hover:border-green-300 hover:pb-1'}`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-6">
                            <Link to="/" className="hover:text-green-300 transition-colors duration-200">
                                <FaUser size={18} />
                            </Link>
                            <Link to="/cart" className="relative hover:text-green-300 transition-colors duration-200">
                                <FaShoppingCart size={20} />
                                {cartItems?.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-medium">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                            <button 
                                className="block md:hidden hover:text-green-300"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {menuOpen && (
                        <nav className="md:hidden py-4">
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link 
                                            to={link.path} 
                                            className={`block text-sm font-medium uppercase
                                                ${location.pathname === link.path 
                                                    ? 'text-green-400' 
                                                    : 'hover:text-green-300'}`}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;