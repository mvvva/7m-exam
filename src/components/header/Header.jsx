import React from 'react';
import {FaPhone} from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-[#0D2613] text-white fixed w-full z-[1000]">
            <div className=" mx-auto flex justify-between items-center py-4 px-6">
                <div className="flex items-center space-x-6">
                    <div className="text-2xl font-bold">
                        <span>GG</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaPhone />
                        <a href="tel:+4904-049-950" className="hover:underline">
                            +4904-049-950
                        </a>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                     <div className="text-sm">
                        <a href="#" className="hover:underline">
                            Get 50% Off on the Selected Items
                        </a>
                    </div>
                     <div className="text-sm border-l-2 pl-4">
                        <a href="#" className="hover:underline">
                            Shop now
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="languages">
                        <select className='bg-slate-600' name="" id="">
                            <option value="english">english</option>
                            <option value="uzbek">uzbek</option>
                            <option value="russian">russian</option>
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <button className="hover:underline">Location</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
