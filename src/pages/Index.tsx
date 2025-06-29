import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEOHead from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';
import { useProperties } from '../hooks/useProperties';
import { Link } from 'react-router-dom';
import { Loader2, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  
  const {
    data: allProducts,
    isLoading: productsLoading
  } = useProducts();
  const {
    data: properties,
    isLoading: propertiesLoading
  } = useProperties();

  const formatProductsForComponent = (products: any[]) => {
    return products?.map(product => ({
      id: product.id,
      images: product.images || [],
      title: product.title,
      price: product.price,
      originalPrice: product.original_price,
      category: product.category,
      description: product.description || '',
      inStock: product.in_stock
    })) || [];
  };

  const formatPropertiesForComponent = (properties: any[]) => {
    return properties?.map(property => ({
      id: property.id,
      images: property.images || [],
      title: property.title,
      price: property.price,
      location: property.location,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      phone: "+256 123 456 789"
    })) || [];
  };

  const featuredProducts = formatProductsForComponent(allProducts?.filter(product => product.featured) || []);
  const formattedProperties = formatPropertiesForComponent(properties || []);

  if (productsLoading || propertiesLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Daxx Shop",
    "description": "Uganda's premier online marketplace for gadgets, fashion, accessories, and property",
    "url": "https://daxxshop.com",
    "logo": "https://daxxshop.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+256751173504",
      "contactType": "customer service"
    },
    "areaServed": "Uganda",
    "currenciesAccepted": "UGX",
    "paymentAccepted": "Cash, Mobile Money, WhatsApp"
  };

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <SEOHead 
        title="Daxx Shop - Quality Gadgets, Fashion & Property | Uganda's Premier Online Store"
        description="Shop premium gadgets, trendy fashion, stylish accessories, and quality properties at Daxx Shop Uganda. Best prices, fast delivery, and excellent customer service. Your trusted online marketplace."
        keywords="Uganda online shop, gadgets Uganda, fashion Uganda, accessories Uganda, property Uganda, electronics Kampala, clothing store Uganda, mobile phones Uganda, laptops Uganda, real estate Uganda, Daxx Shop"
        url="https://daxxshop.com"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      <Hero />
      
      {/* Search Section */}
      <section className="py-8 amazon-gray">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Find What You're Looking For
          </h2>
          <p className="text-gray-600">
            Search through our products and properties
          </p>
        </div>
        <SearchBar />
      </section>
      
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Discover our handpicked selection of premium products
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(item => (
                <Link key={item.id} to={`/product/${item.id}`} className="block">
                  <div className="bg-white rounded amazon-border border amazon-shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                    <div className="relative">
                      <img 
                        src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.svg'} 
                        alt={item.title} 
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute top-2 left-2 amazon-orange text-white p-2 rounded-full shadow-lg">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-sm">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="text-sm font-bold text-gray-900">
                        UGX {item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Property Listings Section */}
      <CategorySection 
        id="property" 
        title="Property Listings" 
        subtitle="Find your perfect home or investment opportunity" 
        type="property" 
        items={formattedProperties} 
      />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
