
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';
import { Search, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const GadgetsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: gadgets, isLoading: gadgetsLoading } = useProducts('gadgets');
  const { data: accessories, isLoading: accessoriesLoading } = useProducts('accessories');

  const isLoading = gadgetsLoading || accessoriesLoading;

  // Combine gadgets and accessories
  const allProducts = [...(gadgets || []), ...(accessories || [])];

  const filteredProducts = allProducts?.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    return matchesSearch && product.section === activeCategory;
  }) || [];

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

  const formattedProducts = formatProductsForComponent(filteredProducts);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Latest Gadgets & Accessories - E-Sale Uganda",
    "description": "Premium gadgets, electronics, smartphones, laptops, tech accessories and more in Uganda",
    "url": "https://daxxshop.com/gadgets",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": formattedProducts.length,
      "itemListElement": formattedProducts.slice(0, 10).map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.title,
        "url": `https://daxxshop.com/product/${product.id}`,
        "image": product.images[0] || "https://daxxshop.com/placeholder.svg",
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "UGX",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }))
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0 mobile-contained">
      <SEOHead
        title="Latest Gadgets, Electronics & Accessories | E-Sale Uganda - Smartphones, Laptops & Tech"
        description="Shop premium gadgets, electronics and accessories in Uganda. Find smartphones, laptops, tablets, smartwatches, headphones, and tech accessories at best prices. Fast delivery across Uganda."
        keywords="gadgets Uganda, electronics Uganda, smartphones Uganda, laptops Uganda, tablets Uganda, tech accessories Uganda, mobile phones Kampala, electronics Kampala, gadgets online Uganda"
        url="https://daxxshop.com/gadgets"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gadgets & Accessories
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Cutting-edge technology and stylish accessories - Smartphones, Laptops, Tablets & More
            </p>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setActiveCategory('gadgets')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === 'gadgets'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Gadgets
              </button>
              <button
                onClick={() => setActiveCategory('accessories')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === 'accessories'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Accessories
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300/50 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
            />
            <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {formattedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formattedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No products found matching your search.' : 'No products available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default GadgetsPage;
