
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

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addToCart({ id, title, price, images, category });
    }
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      const phoneNumber = category === 'fashion' ? "+256740657694" : "+256751173504";
      const baseUrl = window.location.origin;
      const productUrl = `${baseUrl}/product/${id}`;
      const message = `Hello! I'd like to order this product:\n\n${title}\nPrice: UGX ${price.toLocaleString()}\nCategory: ${category}\nLink: ${productUrl}\n\nPlease confirm availability and delivery details. Thank you!`;
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="product-card bg-card rounded-xl border border-border overflow-hidden relative">
        {/* Image */}
        <div className="relative overflow-hidden bg-muted">
          <div className="aspect-square">
            <img
              src={displayImage}
              alt={title}
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
              className="product-image w-full h-full object-cover"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] md:text-xs font-bold">
                -{discount}%
              </span>
            )}
            {section === 'gadgets' && condition && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold text-white ${
                condition === 'new' ? 'bg-emerald-500' : 'bg-sky-500'
              }`}>
                {condition === 'new' ? 'NEW' : 'USED'}
              </span>
            )}
          </div>

          {!inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white/90 text-foreground text-xs font-bold px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick action overlay */}
          {inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex gap-1.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="h-3 w-3" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.787"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-semibold text-foreground line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-sm md:text-base font-bold price-tag">
              UGX {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                UGX {originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile-only action buttons (since hover doesn't work on mobile) */}
          {inStock && (
            <div className="flex gap-1.5 mt-2.5 md:hidden">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1"
              >
                <ShoppingCart className="h-3 w-3" />
                Cart
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="px-3 py-2 rounded-lg bg-emerald-500 text-white flex items-center justify-center"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.787"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
