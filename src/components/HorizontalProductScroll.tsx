
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  images: string[];
  title: string;
  price: number;
  originalPrice?: number;
  section: string;
  description: string;
  condition?: string;
  category?: string;
  inStock?: boolean;
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
  const { addToCart } = useCart();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      category: product.category || product.section
    });
  };

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div>
            <h2 className="text-base md:text-xl font-bold text-foreground">{title}</h2>
            <p className="text-[11px] md:text-sm text-muted-foreground">{subtitle}</p>
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
              className="flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:underline whitespace-nowrap"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex-shrink-0 w-[150px] sm:w-[175px] md:w-[210px] lg:w-[230px] snap-start group"
              >
                <div className="product-card bg-card rounded-xl border border-border overflow-hidden h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-muted">
                    <div className="aspect-square">
                      <img
                        src={product.images?.[0] || '/placeholder.svg'}
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                        width={230}
                        height={230}
                        className="product-image w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                      {discount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[9px] md:text-[10px] font-bold">
                          -{discount}%
                        </span>
                      )}
                      {product.section === 'gadgets' && product.condition && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold text-white ${
                          product.condition === 'new' ? 'bg-emerald-500' : 'bg-sky-500'
                        }`}>
                          {product.condition === 'new' ? 'NEW' : 'USED'}
                        </span>
                      )}
                    </div>

                    {/* Quick cart button on hover (desktop) */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute bottom-2 right-2 p-2 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hidden md:flex items-center justify-center hover:scale-110"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-2.5 md:p-3">
                    <h3 className="font-medium text-foreground text-xs md:text-sm line-clamp-2 leading-snug mb-1.5 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm md:text-base font-bold price-tag">
                        UGX {product.price.toLocaleString()}
                      </span>
                    </div>
                    {product.originalPrice && (
                      <span className="text-[9px] md:text-xs text-muted-foreground line-through">
                        UGX {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductScroll;
