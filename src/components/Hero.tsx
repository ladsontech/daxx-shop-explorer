
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUpdates } from '@/hooks/useUpdates';
import { Loader2 } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: updates, isLoading } = useUpdates();
  
  const publishedUpdates = updates?.filter(update => update.published && update.image_url) || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % publishedUpdates.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + publishedUpdates.length) % publishedUpdates.length);
  };

  useEffect(() => {
    if (publishedUpdates.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [publishedUpdates.length]);

  useEffect(() => {
    if (currentSlide >= publishedUpdates.length) setCurrentSlide(0);
  }, [publishedUpdates.length, currentSlide]);

  if (isLoading) {
    return (
      <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-muted flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (publishedUpdates.length === 0) {
    return (
      <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2">
            Welcome to E-Sale Uganda
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Your premier online marketplace
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-xl">
        {/* Mobile - single image */}
        <div className="block md:hidden">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
            {publishedUpdates.map((update, index) => (
              <div
                key={update.id}
                className={`absolute inset-0 transition-transform duration-500 ease-out ${
                  index === currentSlide ? 'translate-x-0' : 
                  index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <img
                  src={update.image_url}
                  alt="Promotion"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop - multi image carousel */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 45}%)` }}>
              {publishedUpdates.map((update, index) => (
                <div key={update.id} className="flex-shrink-0 w-[45%] pr-4">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                    <img
                      src={update.image_url}
                      alt="Promotion"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        {publishedUpdates.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-1.5 rounded-full shadow-sm z-10 transition-colors">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-1.5 rounded-full shadow-sm z-10 transition-colors">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {publishedUpdates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white w-4 md:w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
