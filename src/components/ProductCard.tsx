
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

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      const phoneNumber = category === 'fashion' ? "+256740657694" : "+256751173504";
      const baseUrl = window.location.origin;
      const productUrl = `${baseUrl}/product/${id}`;
      
      const message = `Hello! I'd like to order this product:\n\n` +
        `${title}\n` +
        `Price: UGX ${price.toLocaleString()}\n` +
        `Category: ${category}\n` +
        `Link: ${productUrl}\n\n` +
        `Please confirm availability and delivery details. Thank you!`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
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
          
          <div className="flex space-x-2">
            <button
              className={`flex-1 py-1.5 md:py-2 px-2 md:px-3 rounded text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                inStock 
                  ? 'amazon-orange amazon-hover-orange text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              <span className="sm:hidden">{inStock ? 'Cart' : 'N/A'}</span>
            </button>
            
            {inStock && (
              <button
                className="px-2 md:px-3 py-1.5 md:py-2 rounded text-xs md:text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-200 flex items-center justify-center"
                onClick={handleWhatsAppOrder}
                title="Order via WhatsApp"
              >
                {/* Real WhatsApp SVG Icon */}
                <svg
                  className="h-3 w-3 md:h-4 md:w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.787"/>
                </svg>
                <span className="hidden md:inline ml-1">WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
