
import React from 'react';
import { X, Plus, Minus, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  // Check if cart contains mixed categories that require different WhatsApp numbers
  const getCartCategories = () => {
    const categories = [...new Set(items.map(item => item.category))];
    return categories;
  };

  const hasMixedCategories = () => {
    const categories = getCartCategories();
    const fashionCategories = ['fashion'];
    const otherCategories = ['gadgets', 'accessories', 'property'];
    
    const hasFashion = categories.some(cat => fashionCategories.includes(cat));
    const hasOthers = categories.some(cat => otherCategories.includes(cat));
    
    return hasFashion && hasOthers;
  };

  const handleWhatsAppCheckout = () => {
    if (hasMixedCategories()) {
      return; // Don't proceed with checkout
    }

    const categories = getCartCategories();
    const isFashionOrder = categories.includes('fashion');
    
    // Use different phone numbers based on category
    const phoneNumber = isFashionOrder ? "0740657694" : "+256751173504";
    const baseUrl = window.location.origin;
    
    let message = "Hello! I'd like to place an order for the following items:\n\n";
    
    items.forEach((item, index) => {
      const productUrl = `${baseUrl}/product/${item.id}`;
      message += `${index + 1}. ${item.title}\n`;
      message += `   Price: UGX ${item.price.toLocaleString()}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Subtotal: UGX ${(item.price * item.quantity).toLocaleString()}\n`;
      message += `   Link: ${productUrl}\n\n`;
    });
    
    message += `Total: UGX ${getTotalPrice().toLocaleString()}\n\n`;
    message += "Please confirm availability and delivery details. Thank you!";
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after checkout
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4">
              {/* Mixed Categories Warning */}
              {hasMixedCategories() && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You can't order fashion items together with other categories as they go to different WhatsApp numbers. Please checkout separately or remove items from different categories.
                  </AlertDescription>
                </Alert>
              )}

              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={item.images[0] || '/placeholder.svg'}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <p className="font-semibold text-sm">UGX {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-red-100 text-red-500 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold">UGX {getTotalPrice().toLocaleString()}</span>
              </div>
              <Button
                onClick={handleWhatsAppCheckout}
                disabled={hasMixedCategories()}
                className={`w-full ${
                  hasMixedCategories() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                Checkout via WhatsApp
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
