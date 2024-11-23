import React, { useRef, useEffect, memo } from "react";


import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";

import DiscoverSection from "../components/discoverSection"
import HeroSection from "../components/HeroSection";
import DecisionSection from "../components/DecisionSection";

// Constants
export const SECTIONS = {
  HERO: {
    title: "START YOUR GAME WITH THE BEST",
    subtitle: "We've Got Everything You Need for Gaming Supremacy",
    stats: [
      { label: "POPULAR PROFESSIONAL BRANDS", value: "15+" },
      { label: "ITEMS", value: "2500+" }
    ]
  },
  DISCOVER: {
    title: "Discover News and Innovations"
  },
  DECISION: {
    title: "MAKE YOUR BEST DECISION - JOIN US"
  }, 
  CONTACT:{
    title: "I help turn your ideas into digital realities.",
    subtitle: `Hi there, I am Saidumarkhon. 
    I am Frontend Developer, specialize in designing and implementing the user-facing aspects of software applications, such as websites or web applications.`
  }

};


function Home() {


  const cards = [
    {
      image: img2,
      title: "Always in the Game",
      description: "Stay ahead of the latest gaming tech with new releases, exclusive deals, and exciting pre-orders.",
    },
    {
      image: img1,
      title: "Enhance Your Experience",
      description: "Upgrade your setup and personalize your space with our premium collection of gaming accessories.",
    },
    {
      image: img3,
      title: "Command the Battle",
      description: "Take control with our diverse range of gaming keyboards, featuring precision mechanical switches.",
    }
  ];

  return (
    <main className="overflow-hidden">
      <HeroSection sections={SECTIONS}/>
      <DiscoverSection cards={cards} sections={SECTIONS} />
      <DecisionSection sections={SECTIONS}/>
    </main>
  );
}

export default Home;