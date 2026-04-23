
import React from 'react';
import { ShoppingCart, MessageCircle } from 'lucide-react';
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
  id, images, title, price, originalPrice, category, section, description, inStock = true, condition
}) => {
  const { addToCart } = useCart();
  const displayImage = images?.[0] || '/placeholder.svg';
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) addToCart({ id, title, price, images, category });
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    const phoneNumber = category === 'fashion' ? "+256740657694" : "+256751173504";
    const productUrl = `${window.location.origin}/product/${id}`;
    const message = `Hello! I'd like to order:\n\n${title}\nPrice: UGX ${price.toLocaleString()}\nLink: ${productUrl}`;
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50">
        {/* Image container */}
        <div className="relative overflow-hidden bg-secondary/30">
          <div className="aspect-[4/5]">
            <img
              src={displayImage}
              alt={title}
              loading="lazy"
              decoding="async"
              width={400}
              height={500}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Top badges */}
          {(discount > 0 || (section === 'gadgets' && condition)) && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discount > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-destructive text-destructive-foreground text-[11px] font-bold shadow-sm">
                  -{discount}%
                </span>
              )}
              {section === 'gadgets' && condition && (
                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shadow-sm ${
                  condition === 'new' ? 'bg-emerald-500' : 'bg-sky-500'
                }`}>
                  {condition === 'new' ? 'NEW' : 'USED'}
                </span>
              )}
            </div>
          )}

          {/* Out of stock overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-card text-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover action - desktop only */}
          {inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-lg"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="px-3 py-2.5 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5">
          <h3 className="text-[13px] md:text-sm font-medium text-foreground line-clamp-2 leading-snug mb-2 min-h-[2.5em]">
            {title}
          </h3>

          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="text-base md:text-lg font-bold text-primary">
                UGX {price.toLocaleString()}
              </span>
              {originalPrice && (
                <div className="text-[11px] text-muted-foreground line-through mt-0.5">
                  UGX {originalPrice.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Mobile actions */}
          {inStock && (
            <div className="flex gap-2 mt-3 md:hidden">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1"
              >
                <ShoppingCart className="h-3 w-3" />
                Cart
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="px-3 py-2 rounded-xl bg-emerald-500 text-white flex items-center justify-center"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
