
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUpdates } from '@/hooks/useUpdates';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface FeaturedProduct {
  id: string;
  images: string[];
  title: string;
  price: number;
  originalPrice?: number;
  category?: string;
  section?: string;
}

interface HeroProps {
  featuredProducts?: FeaturedProduct[];
}

const Hero: React.FC<HeroProps> = ({ featuredProducts = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: updates, isLoading } = useUpdates();
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  
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

  const handleAddToCart = (e: React.MouseEvent, product: FeaturedProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      category: product.category || product.section || ''
    });
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[220px] md:h-[380px] bg-secondary/50 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (publishedUpdates.length === 0) {
    return (
      <div className="w-full h-[220px] md:h-[380px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2">Welcome to E-Sale Uganda</h1>
          <p className="text-sm md:text-base text-muted-foreground">Your premier online marketplace</p>
        </div>
      </div>
    );
  }

  const showOverlay = featuredProducts.length > 0;

  return (
    <div className="relative">
      {/* Carousel - fixed height, no vertical scroll */}
      <div className={`relative w-full overflow-hidden ${showOverlay ? 'h-[260px] md:h-[420px]' : 'h-[200px] md:h-[340px]'}`}>
        {publishedUpdates.map((update, index) => (
          <div
            key={update.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
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

        {/* Dark gradient at bottom for product overlay readability */}
        {showOverlay && (
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
        )}

        {/* Carousel Navigation */}
        {publishedUpdates.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-3 top-1/3 -translate-y-1/2 bg-card/70 backdrop-blur-sm hover:bg-card p-1.5 md:p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110">
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/3 -translate-y-1/2 bg-card/70 backdrop-blur-sm hover:bg-card p-1.5 md:p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110">
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>

            <div className="absolute top-[58%] md:top-[45%] left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {publishedUpdates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-5 shadow-md' : 'bg-white/40 w-1.5 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Featured Products Overlay - sits on bottom portion of hero */}
        {showOverlay && (
          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-3 md:pb-4">
            <div className="max-w-7xl mx-auto">
              {/* Section label */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs md:text-sm font-semibold text-white/90 drop-shadow-sm">Featured Products</h3>
                <div className="hidden md:flex gap-1">
                  <button onClick={() => scrollProducts('left')} className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <ChevronLeft className="h-3.5 w-3.5 text-white" />
                  </button>
                  <button onClick={() => scrollProducts('right')} className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <ChevronRight className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Product cards row */}
              <div
                ref={scrollRef}
                className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              >
                {featuredProducts.slice(0, 10).map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex-shrink-0 w-[100px] md:w-[140px] snap-start group"
                  >
                    <div className="bg-card/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/10 hover:scale-105 transition-transform duration-200">
                      <div className="relative">
                        <div className="aspect-square">
                          <img
                            src={product.images?.[0] || '/placeholder.svg'}
                            alt={product.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hidden md:flex"
                        >
                          <ShoppingCart className="h-2.5 w-2.5" />
                        </button>
                      </div>
                      <div className="p-1.5 md:p-2">
                        <p className="text-[9px] md:text-[11px] font-medium text-foreground line-clamp-1 leading-tight">{product.title}</p>
                        <p className="text-[10px] md:text-xs font-bold text-primary mt-0.5">UGX {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
