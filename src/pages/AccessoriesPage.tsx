import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';
import { Search, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AccessoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: accessories, isLoading } = useProducts('accessories');

  const filteredAccessories = accessories?.filter(product => 
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

  const formattedAccessories = formatProductsForComponent(filteredAccessories);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Premium Accessories - E-Sale Uganda", 
    "description": "Quality accessories, phone cases, chargers, bags, watches, and tech accessories in Uganda",
    "url": "https://daxxshop.com/accessories",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": formattedAccessories.length,
      "itemListElement": formattedAccessories.slice(0, 10).map((product, index) => ({
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
          <p className="text-gray-600">Loading accessories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0 mobile-contained">
      <SEOHead
        title="Premium Accessories & Tech Gadgets | E-Sale Uganda - Cases, Chargers & More"
        description="Shop quality accessories in Uganda. Phone cases, chargers, bags, watches, tech accessories, and gadget add-ons. Enhance your devices with premium accessories."
        keywords="accessories Uganda, phone cases Uganda, chargers Uganda, bags Uganda, watches Uganda, tech accessories Uganda, gadget accessories Kampala, phone accessories Uganda"
        url="https://daxxshop.com/accessories"
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
              Premium Accessories
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enhance your devices with quality accessories - Cases, Chargers, Bags & More
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search accessories..."
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
          {formattedAccessories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formattedAccessories.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No accessories found matching your search.' : 'No accessories available at the moment.'}
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

export default AccessoriesPage;
