
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  originalPrice,
  category,
  description,
  inStock = true
}) => {
  return (
    <Link to={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              SALE
            </div>
          )}
          <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
            {category}
          </div>
        </div>
        
        <div className="p-3 md:p-4">
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="text-sm md:text-xl font-bold text-gray-900">UGX {price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-xs md:text-sm text-gray-500 line-through">UGX {originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
          
          <button 
            className={`w-full py-1.5 md:py-2 px-3 md:px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 ${
              inStock 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inStock}
            onClick={(e) => e.preventDefault()}
          >
            <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
            <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
