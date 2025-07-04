import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: string;
  images: string[];
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  section: string;
  description: string;
  inStock?: boolean;
  condition?: 'new' | 'used' | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  images,
  title,
  price,
  originalPrice,
  category,
  section,
  description,
  inStock = true,
  condition
}) => {
  const { addToCart } = useCart();
  const displayImage = images && images.length > 0 ? images[0] : '/placeholder.svg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addToCart({
        id,
        title,
        price,
        images,
        category
      });
    }
  };

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="bg-white rounded amazon-border border amazon-shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
        <div className="relative">
          <img
            src={displayImage}
            alt={title}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Only show condition badge for gadgets */}
          {section === 'gadgets' && condition && (
            <div className={`absolute top-2 right-2 px-1 md:px-2 py-0.5 md:py-1 rounded text-xs font-semibold text-white ${
              condition === 'new' ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {condition === 'new' ? 'NEW' : 'USED'}
            </div>
          )}
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
              <span className="text-sm font-bold text-gray-900 md:text-sm">UGX {price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-xs md:text-sm text-gray-500 line-through">UGX {originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
          
          <button
            className={`w-full py-1.5 md:py-2 px-3 md:px-4 rounded text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 ${
              inStock 
                ? 'amazon-orange amazon-hover-orange text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inStock}
            onClick={handleAddToCart}
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