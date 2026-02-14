
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  images: string[];
  title: string;
  price: number;
  originalPrice?: number;
  section: string;
  description: string;
  condition?: string;
}

interface HorizontalProductScrollProps {
  title: string;
  subtitle: string;
  products: Product[];
  viewAllLink: string;
  accentColor: string;
}

const HorizontalProductScroll: React.FC<HorizontalProductScrollProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  accentColor
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-5 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
              {title}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => scroll('left')}
                className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
            
            <Link
              to={viewAllLink}
              className="flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex-shrink-0 w-[140px] sm:w-[170px] md:w-[200px] lg:w-[220px] snap-start group"
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.images?.[0] || '/placeholder.svg'}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.section === 'gadgets' && product.condition && (
                    <span className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white ${
                      product.condition === 'new' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {product.condition === 'new' ? 'NEW' : 'USED'}
                    </span>
                  )}
                </div>
                
                <div className="p-2.5 md:p-3">
                  <h3 className="font-medium text-foreground text-xs md:text-sm line-clamp-2 leading-tight mb-1.5">
                    {product.title}
                  </h3>
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-bold text-foreground">
                      UGX {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                        UGX {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductScroll;
