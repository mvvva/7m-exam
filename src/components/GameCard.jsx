import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GameCard = memo(({ image, title, description }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initial state
    gsap.set(card, {
      opacity: 0,
      y: 50,
      scale: 0.95
    });

    // Scroll trigger animation
    const scrollAnimation = gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      }
    });

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(card.querySelector('img'), {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(card.querySelector('img'), {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollAnimation.kill();
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="transform bg-white rounded-lg overflow-hidden w-full sm:w-80"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">{description}</p>
        <a 
          href="#" 
          className="group inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          Explore More
          <svg 
            className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
});

GameCard.displayName = "GameCard";

export default GameCard;