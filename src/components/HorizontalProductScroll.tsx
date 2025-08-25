
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Scroll Controls */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={scrollLeft}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <Link
              to={viewAllLink}
              className={`${accentColor} text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
            >
              View All
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex-shrink-0 w-64 md:w-72"
            >
              <div className="bg-white rounded-lg amazon-border border amazon-shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative">
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg'}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Featured badge */}
                  <div className="absolute top-2 left-2 amazon-orange text-white p-2 rounded-full shadow-lg">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  
                  {/* Condition badge for gadgets */}
                  {product.section === 'gadgets' && product.condition && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold text-white ${
                      product.condition === 'new' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {product.condition === 'new' ? 'NEW' : 'USED'}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-sm line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">
                      UGX {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
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
