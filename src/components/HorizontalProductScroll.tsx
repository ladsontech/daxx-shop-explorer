
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
                className="flex-shrink-0 w-[155px] sm:w-[180px] md:w-[220px] lg:w-[240px] snap-start group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-secondary/30">
                    <div className="aspect-[4/5]">
                      <img
                        src={product.images?.[0] || '/placeholder.svg'}
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                        width={240}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Badges */}
                    {(discount > 0 || (product.section === 'gadgets' && product.condition)) && (
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
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
                      className="absolute bottom-2.5 right-2.5 p-2.5 rounded-xl bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hidden md:flex items-center justify-center hover:brightness-110"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-medium text-foreground text-xs md:text-sm line-clamp-2 leading-snug mb-2 flex-1">
                      {product.title}
                    </h3>
                    <div>
                      <span className="text-sm md:text-base font-bold text-primary">
                        UGX {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <div className="text-[10px] text-muted-foreground line-through">
                          UGX {product.originalPrice.toLocaleString()}
                        </div>
                      )}
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
