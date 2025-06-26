import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Share2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useProductById } from '../hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
const ProductDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    addToCart
  } = useCart();
  const {
    data: product,
    isLoading,
    error
  } = useProductById(id || '');
  const handleAddToCart = () => {
    if (product && product.in_stock) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images || [],
        category: product.category
      });
    }
  };
  const handleBuyNow = () => {
    if (product && product.in_stock) {
      const phoneNumber = "+256751173504";
      const baseUrl = window.location.origin;
      const productUrl = `${baseUrl}/product/${product.id}`;
      const message = `Hello! I'd like to buy this product:\n\n` + `${product.title}\n` + `Price: UGX ${product.price.toLocaleString()}\n` + `Category: ${product.category}\n` + `Link: ${productUrl}\n\n` + `Please confirm availability and delivery details. Thank you!`;
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };
  if (isLoading) {
    return <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>;
  }
  if (error || !product) {
    return <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>;
  }
  const productImages = product.images && product.images.length > 0 ? product.images : ['/placeholder.svg'];
  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: product.description || '',
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };
  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Product link copied to clipboard!');
  };
  return <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src={productImages[currentImageIndex]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && <div className="flex space-x-2">
                {productImages.map((image, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}>
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>)}
              </div>}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                <button onClick={handleShare} className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              
              <h1 className="font-bold text-gray-900 mb-4 text-xl">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className="font-bold text-gray-900 text-2xl">UGX {product.price.toLocaleString()}</span>
                {product.original_price && <span className="text-xl text-gray-500 line-through">UGX {product.original_price.toLocaleString()}</span>}
                {product.original_price && <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
                    Save UGX {(product.original_price - product.price).toLocaleString()}
                  </span>}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button onClick={handleAddToCart} className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${product.in_stock ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!product.in_stock}>
                <ShoppingCart className="h-5 w-5" />
                <span>{product.in_stock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              {product.in_stock && <button onClick={handleBuyNow} className="w-full py-3 px-6 rounded-lg font-semibold text-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200">
                  Buy Now via WhatsApp
                </button>}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default ProductDetail;