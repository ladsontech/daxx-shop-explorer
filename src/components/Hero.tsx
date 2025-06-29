
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUpdates } from '@/hooks/useUpdates';
import { Loader2 } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: updates, isLoading } = useUpdates();
  
  // Filter only published updates with images
  const publishedUpdates = updates?.filter(update => update.published && update.image_url) || [];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % publishedUpdates.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + publishedUpdates.length) % publishedUpdates.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (publishedUpdates.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [publishedUpdates.length]);

  // Reset current slide if it's out of bounds
  useEffect(() => {
    if (currentSlide >= publishedUpdates.length) {
      setCurrentSlide(0);
    }
  }, [publishedUpdates.length, currentSlide]);

  if (isLoading) {
    return (
      <div className="h-64 md:h-96 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading updates...</p>
        </div>
      </div>
    );
  }

  if (publishedUpdates.length === 0) {
    return (
      <div className="h-64 md:h-96 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Welcome to Daxx Shop
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Your premier online marketplace for quality products
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 md:h-96 overflow-hidden amazon-shadow">
      {publishedUpdates.map((update, index) => (
        <div
          key={update.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="h-full relative">
            <img
              src={update.image_url}
              alt="Update poster"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            {/* Optional overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons - only show if there are multiple slides */}
      {publishedUpdates.length > 1 && (
        <>
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
            {publishedUpdates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
