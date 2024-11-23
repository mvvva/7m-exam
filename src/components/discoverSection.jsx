import { useEffect, useRef } from "react";
import GameCard from "./GameCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DiscoverSection = ({ cards, sections }) => {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    // Initial state
    gsap.set(title, {
      opacity: 0,
      y: 100
    });

    // animation
    const animation = gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sections.DISCOVER.title]);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0D2613] py-24">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-3xl font-bold text-white text-center mb-16 uppercase tracking-wider"
        >
          {sections.DISCOVER.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {cards.map((card, index) => (
            <GameCard 
              key={index} 
              {...card}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;