
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingCart, MessageCircle } from 'lucide-react';
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
  title, subtitle, products, viewAllLink, accentColor
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -280 : 280;
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
    <section className="py-5 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-1 h-8 rounded-full ${accentColor}`} />
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-foreground tracking-tight">{title}</h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
            
            <Link
              to={viewAllLink}
              className={`flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary hover:underline underline-offset-4 whitespace-nowrap`}
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Product Cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
        >
          {products.map(product => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[185px] lg:w-[200px] snap-start group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full relative">
                  {/* Image fills entire card */}
                  <div className="relative overflow-hidden bg-secondary/30">
                    <div className="aspect-[3/4]">
                      <img
                        src={product.images?.[0] || '/placeholder.svg'}
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                        width={200}
                        height={267}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Badges */}
                    {(discount > 0 || (product.section === 'gadgets' && product.condition)) && (
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {discount > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-destructive text-destructive-foreground text-[10px] font-bold shadow-sm">
                            -{discount}%
                          </span>
                        )}
                        {product.section === 'gadgets' && product.condition && (
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm ${
                            product.condition === 'new' ? 'bg-emerald-500' : 'bg-sky-500'
                          }`}>
                            {product.condition === 'new' ? 'NEW' : 'USED'}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Quick cart - desktop hover */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hidden md:flex items-center justify-center hover:bg-primary hover:text-primary-foreground"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </button>

                    {/* Bottom overlay with product info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-8 pb-2.5 px-2.5">
                      <h3 className="font-medium text-white text-[11px] md:text-xs line-clamp-2 leading-snug mb-1 drop-shadow-sm">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs md:text-sm font-bold text-white drop-shadow-sm">
                          UGX {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[9px] text-white/60 line-through">
                            {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
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
