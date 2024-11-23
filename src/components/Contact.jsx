import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import backgroundImage from "../assets/images/test.jpg";
import { SECTIONS } from "../pages/home";
import { FaChevronRight } from 'react-icons/fa';
import { Link } from "react-router-dom";


const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { 
        ease: "power4.out",
        duration: 1.4
      }
    });

    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      y: 100,
      opacity: 0
    });

    gsap.set(overlayRef.current, {
      opacity: 0
    });

    gsap.to(iconRef.current, {
      x: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    tl.to(overlayRef.current, {
      opacity: 0.6,
      duration: 2
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2
    }, "-=1")
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1
    }, "-=0.8")
    .to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scale: [1],
    }, "-=0.6");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-cover bg-center flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "50% 50%"
      }}
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black opacity-0"
      />
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-xl lg:max-w-2xl mx-auto lg:ml-20 text-center lg:text-left">
          <h1 
            ref={titleRef}
            className="text-2xl lg:text-6xl font-bold text-white mb-4 lg:mb-6"
          >
            {SECTIONS.CONTACT.title}
          </h1>
          <p 
            ref={subtitleRef}
            className="text-sm lg:text-xl text-white mb-6 lg:mb-8"
          >
            {SECTIONS.CONTACT.subtitle}
          </p>

          <Link 
          to={'https://t.me/h_saidumarkhon'}
          >
          <button 
            ref={buttonRef}
            className="inline-flex items-center gap-2 py-2 px-6 lg:py-3 lg:px-28 
                     bg-green-500 rounded-lg hover:bg-green-600 transition-all 
                     text-white text-sm lg:text-base font-semibold
                     hover:scale-105 transform duration-300"
          >
             Get in touch 
             <div ref={iconRef}>
               <FaChevronRight 
                 className="text-white" 
                 size={16} 
               />
             </div>
          </button>
          </Link>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};


export default ContactSection;