import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const advertisements = [
    {
      id: 1,
      title: "Black Friday Sale",
      subtitle: "Up to 70% OFF on Electronics",
      description: "Don't miss out on the biggest deals of the year!",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
      backgroundColor: "bg-gradient-to-r from-orange-500 to-red-600"
    },
    {
      id: 2,
      title: "New iPhone Collection",
      subtitle: "Latest Models Available Now",
      description: "Experience the future with our newest smartphone lineup",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-700"
    },
    {
      id: 3,
      title: "Fashion Week Special",
      subtitle: "Trendy Styles & Premium Quality",
      description: "Discover the latest fashion trends at unbeatable prices",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
      backgroundColor: "bg-gradient-to-r from-green-600 to-emerald-700"
    },
    {
      id: 4,
      title: "Property Deals",
      subtitle: "Prime Locations Available",
      description: "Find your dream home with exclusive property offers",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      backgroundColor: "bg-gradient-to-r from-yellow-500 to-orange-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % advertisements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + advertisements.length) % advertisements.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 md:h-96 overflow-hidden amazon-shadow">
      {advertisements.map((ad, index) => (
        <div
          key={ad.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`${ad.backgroundColor} h-full flex items-center justify-between px-4 md:px-8`}>
            <div className="flex-1 text-white z-10">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                {ad.title}
              </h1>
              <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">
                {ad.subtitle}
              </h2>
              <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90">
                {ad.description}
              </p>
              <button className="amazon-orange amazon-hover-orange px-4 md:px-6 py-2 md:py-3 rounded font-semibold text-sm md:text-base">
                Shop Now
              </button>
            </div>
            <div className="flex-1 flex justify-end">
              <img
                src={ad.image}
                alt={ad.title}
                className="h-32 md:h-64 w-32 md:w-64 object-cover rounded-lg amazon-shadow"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all amazon-shadow"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all amazon-shadow"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {advertisements.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;