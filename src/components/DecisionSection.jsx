// DecisionSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backgroundDecisionImg from "../assets/images/decision.jpg";

gsap.registerPlugin(ScrollTrigger);

const DecisionSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const button = buttonRef.current;
    const overlay = overlayRef.current;

    if (!section || !title || !button || !overlay) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        toggleActions: "play none none reverse"
      }
    });

    gsap.set([title, button], {
      opacity: 0,
      y: 30
    });

    gsap.set(overlay, {
      opacity: 0
    });

    tl.to(overlay, {
      opacity: 0.4,
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(title, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(button, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.3");

    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        background: '#16a34a'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        background: '#22c55e'
      });
    });

    gsap.to(section, {
      backgroundPosition: "50% 30%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${backgroundDecisionImg})`,
        backgroundPosition: "50% 50%"
      }}
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0"
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-4 sm:ml-20">
          <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-8"
          >
            Make Your Decision Today
          </h2>
          <button 
            ref={buttonRef}
            className="w-full sm:w-auto py-2 sm:py-3 px-8 sm:px-28 bg-green-500 rounded-lg transition-colors text-white font-semibold text-sm sm:text-base"
          >
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default DecisionSection