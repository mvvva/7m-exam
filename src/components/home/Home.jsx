import React from 'react';
import backgroundImage from '../../assets/images/bg.jpg';
import backgroundDecision from '../../assets/images/decision.jpg'
import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';

function Home() {
  const cards = [
    {
      image: img2,
      title: 'Always in the game',
      description: 'Stay ahead of the latest and greatest gaming tech, featuring new releases, exclusive deals, and exciting pre-orders.',
    },
    {
      image: img1,
      title: 'Enhance your experience',
      description: 'Upgrade your world by elevating your setup and personalize your space with our collection of stylish and functional gaming accessories.',
    },
    {
      image: img3,
      title: 'Command the battle!',
      description: 'Take control with our diverse range of gaming keyboards, featuring mechanical switches for tactile feedback etc.',
    },
  ];

  return (
    <div className="home">
      <div 
        className="header-wrap w-full bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover', 
          transform: 'scaleX(-1)',
          position: 'relative'
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black via-[#454444] to-black opacity-50"
          style={{ transform: 'scaleX(-1)' }}
        ></div>
      </div>

      <div className="absolute top-44 text-white left-28 w-[550px]">
        <div className='text-6xl'>START YOUR GAME WITH THE BEST</div>
        <p>We've Got Everything <br /> You Need for Gaming Supremacy</p>
        <button className='py-2 px-28 bg-green-500 rounded-lg'>shop</button>
        <p>MORE THAN 15+ POPULAR <br /> PROFESSIONAL <br /> BRANDS</p>
        <p>2500+ ITEMS</p>
      </div>

      <div className="news h-screen bg-[#0D2613] text-center pt-32 text-white">
        <h1 className='text-2xl uppercase'>Discover news and innovations</h1>

        <div className="card-wrapper container pt-5">
          <div className="flex items-center justify-between">
            {cards.map((card, index) => (
              <div key={index} className=" shadow-md overflow-hidden w-full sm:w-80">
                <img src={card.image} alt={card.title} className="w-full h-72 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                  <p className=" mb-4">{card.description}</p>
                  <a href="#" className="text-blue-500 hover:underline">See More...</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
        <div className="decision relative w-full h-screen "
        style={{
          backgroundImage: `url(${backgroundDecision})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <div className="  absolute left-[8.5rem] top-[12rem] ">
            <p className="text text-white text-6xl uppercase">make your <br /> best decision-join us</p>
            <button className='py-2 px-28 bg-green-500 rounded-lg'>Join</button>
            </div>
          
          
        </div>

      
    </div>
  );
}

export default Home;
