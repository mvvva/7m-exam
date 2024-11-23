import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import backgroundImage from "../assets/images/bg.jpg";

const HeroSection = ({ sections }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Create timeline for smooth sequence of animations
    const tl = gsap.timeline({
      defaults: { 
        ease: "power4.out",
        duration: 1.4
      }
    });

    // Initial states
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      y: 100,
      opacity: 0
    });

    // Set initial state for stats items individually
    const statsItems = statsRef.current.children;
    gsap.set(statsItems, {
      y: 100,
      opacity: 0
    });

    gsap.set(overlayRef.current, {
      opacity: 0
    });

    // Background overlay fade in
    tl.to(overlayRef.current, {
      opacity: 0.6,
      duration: 2
    });

    // Title animation with split text effect
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: {
        amount: 0.3
      }
    }, "-=1");

    // Subtitle animation
    tl.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1
    }, "-=0.8");

    // Button scale and fade animation
    tl.to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scale: [0.8, 1],
    }, "-=0.6");

    // Stats staggered animation - modified for better control
    tl.to(statsItems, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,  // More precise control over stagger timing
      ease: "power2.out"
    }, "-=0.4");

    // Optional scroll-based parallax effect
    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 70%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Cleanup
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
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-xl sm:max-w-2xl mx-4 sm:mx-8 md:mx-12 lg:ml-20">
          <h1 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6"
          >
            {sections.HERO.title}
          </h1>

          <p 
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-white mb-4 sm:mb-6 lg:mb-8"
          >
            {sections.HERO.subtitle}
          </p>

          <button 
            ref={buttonRef}
            className="w-full sm:w-auto py-2 sm:py-3 px-6 sm:px-16 md:px-20 lg:px-28 
                     bg-green-500 rounded-lg hover:bg-green-600 
                     transition-all text-white font-semibold
                     hover:scale-105 transform duration-300
                     text-sm sm:text-base md:text-lg"
          >
            Shop Now
          </button>
          
          <div 
            ref={statsRef}
            className="mt-8 sm:mt-10 lg:mt-12 space-y-2 sm:space-y-3 lg:space-y-4"
          >
            {sections.HERO.stats.map(({ label, value }) => (
              <div 
                key={label} 
                className="text-white"
              >
                <span className="text-xl sm:text-2xl font-bold">{value}</span>
                <p className="text-xs sm:text-sm opacity-80 uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-4 sm:w-5 lg:w-6 h-8 sm:h-9 lg:h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

