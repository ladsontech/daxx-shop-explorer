import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';
import { Search, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const CosmeticsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: cosmetics, isLoading } = useProducts('cosmetics');

  const filteredCosmetics = cosmetics?.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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

  const formattedCosmetics = formatProductsForComponent(filteredCosmetics);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Beauty & Cosmetics - Daxx Shop Uganda", 
    "description": "Premium beauty products, cosmetics, skincare, makeup, and personal care items in Uganda",
    "url": "https://daxxshop.com/cosmetics",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": formattedCosmetics.length,
      "itemListElement": formattedCosmetics.slice(0, 10).map((product, index) => ({
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
          <p className="text-gray-600">Loading cosmetics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <SEOHead
        title="Beauty & Cosmetics | Daxx Shop Uganda - Makeup, Skincare & Personal Care"
        description="Shop premium beauty products and cosmetics in Uganda. Makeup, skincare, perfumes, hair care, and personal care items. Quality beauty products at affordable prices."
        keywords="cosmetics Uganda, beauty products Uganda, makeup Uganda, skincare Uganda, perfumes Uganda, hair care Uganda, beauty store Uganda, cosmetics Kampala, makeup store Uganda"
        url="https://daxxshop.com/cosmetics"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Beauty & Cosmetics
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enhance your natural beauty with premium cosmetics - Makeup, Skincare & Personal Care
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search beauty products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300/50 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm text-lg"
            />
            <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {formattedCosmetics.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formattedCosmetics.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No cosmetics found matching your search.' : 'No cosmetics available at the moment.'}
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

export default CosmeticsPage;