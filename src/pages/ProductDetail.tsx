
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ProductCard from '../components/ProductCard';
import { useProductById, useProducts } from '../hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useProductById(id || '');
  const { data: allProducts } = useProducts();

  // Get related products from the same category (excluding current product)
  const relatedProducts = allProducts?.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 8) || [];

  const formatProductsForComponent = (products: any[]) => {
    return products?.map(product => ({
      id: product.id,
      images: product.images || [],
      title: product.title,
      price: product.price,
      originalPrice: product.original_price,
      category: product.category,
      section: product.section,
      description: product.description || '',
      inStock: product.in_stock,
      condition: product.condition
    })) || [];
  };

  const formattedRelatedProducts = formatProductsForComponent(relatedProducts);

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
      const phoneNumber = product.category === 'fashion' ? "+256740657694" : "+256751173504";
      const baseUrl = window.location.origin;
      const productUrl = `${baseUrl}/product/${product.id}`;
      
      const message = `Hello! I'd like to buy this product:\n\n` +
        `${product.title}\n` +
        `Price: UGX ${product.price.toLocaleString()}\n` +
        `Category: ${product.category}\n` +
        `Link: ${productUrl}\n\n` +
        `Please confirm availability and delivery details. Thank you!`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-sm md:text-base">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm md:text-base">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : ['/placeholder.svg'];
  const productTitle = `${product.title} | ${product.category} | Daxx Shop Uganda`;
  const productDescription = `${product.description || product.title} - Premium ${product.category} available at Daxx Shop Uganda. Price: UGX ${product.price.toLocaleString()}. ${product.in_stock ? 'In Stock' : 'Out of Stock'}. Fast delivery across Uganda.`;
  const productKeywords = `${product.title}, ${product.category}, Uganda, Daxx Shop, buy ${product.category} Uganda, ${product.category} Kampala, online shopping Uganda`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description || product.title,
    "image": productImages,
    "brand": {
      "@type": "Brand",
      "name": "Daxx Shop"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "UGX",
      "availability": product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Daxx Shop",
        "url": "https://daxxshop.com"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "50"
    }
  };

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

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <SEOHead
        title={productTitle}
        description={productDescription}
        keywords={productKeywords}
        image={productImages[0]}
        url={`https://daxxshop.com/product/${product.id}`}
        type="product"
        price={product.price}
        currency="UGX"
        availability={product.in_stock ? 'InStock' : 'OutOfStock'}
        category={product.category}
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 md:mb-6 text-sm md:text-base">
          <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Image Gallery */}
          <div className="space-y-2 md:space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm text-blue-600 font-medium capitalize">{product.category}</span>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm">Share</span>
                </button>
              </div>
              
              <h1 className="font-bold text-gray-900 mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl leading-tight">
                {product.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3 md:mb-4 space-y-2 sm:space-y-0">
                <span className="font-bold text-gray-900 text-xl md:text-2xl">UGX {product.price.toLocaleString()}</span>
                {product.original_price && (
                  <>
                    <span className="text-lg md:text-xl text-gray-500 line-through">UGX {product.original_price.toLocaleString()}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs md:text-sm font-semibold">
                      Save UGX {(product.original_price - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Condition Badge for Gadgets */}
              {product.section === 'gadgets' && product.condition && (
                <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold text-white mb-3 ${
                  product.condition === 'new' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {product.condition === 'new' ? 'NEW' : 'USED'}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-4 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 md:py-3 px-4 md:px-6 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  product.in_stock
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                <span>{product.in_stock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              {product.in_stock && (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 md:py-3 px-4 md:px-6 rounded-lg font-semibold text-base md:text-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                >
                  Buy Now via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {formattedRelatedProducts.length > 0 && (
          <section className="mt-12 md:mt-16">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Related Products
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                More {product.category} items you might like
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {formattedRelatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
