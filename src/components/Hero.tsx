
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUpdates } from '@/hooks/useUpdates';
import { Loader2 } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: updates, isLoading } = useUpdates();
  
  const publishedUpdates = updates?.filter(update => update.published && update.image_url) || [];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % publishedUpdates.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + publishedUpdates.length) % publishedUpdates.length);

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
      <div className="w-full aspect-[2/1] md:aspect-[2.5/1] bg-secondary/50 flex items-center justify-center rounded-2xl mx-4 mt-4">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (publishedUpdates.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="w-full aspect-[2/1] md:aspect-[2.5/1] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2">Welcome to E-Sale Uganda</h1>
            <p className="text-sm md:text-base text-muted-foreground">Your premier online marketplace</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4">
      <div className="relative overflow-hidden rounded-2xl bg-secondary/30">
        {/* Slides */}
        <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1]">
          {publishedUpdates.map((update, index) => (
            <div
              key={update.id}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={update.image_url}
                alt="Promotion"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        {publishedUpdates.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-md hover:bg-card p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-md hover:bg-card p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {publishedUpdates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-6 shadow-md' : 'bg-white/40 w-2 hover:bg-white/60'
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
