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
      section: product.section,
      description: product.description || '',
      inStock: product.in_stock,
      condition: product.condition
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

  // Balance featured products across all categories
  const getBalancedFeaturedProducts = () => {
    if (!allProducts) return [];
    
    const categories = ['gadgets', 'accessories', 'cosmetics', 'fashion'];
    const maxPerCategory = 2; // Maximum products per category
    const balancedProducts: any[] = [];
    
    // Get featured products from each category
    categories.forEach(category => {
      const categoryProducts = allProducts
        .filter(product => product.section === category && product.featured)
        .slice(0, maxPerCategory); // Limit per category
      
      balancedProducts.push(...categoryProducts);
    });
    
    // If we don't have enough featured products, fill with non-featured products
    if (balancedProducts.length < 8) {
      const remainingSlots = 8 - balancedProducts.length;
      const usedIds = new Set(balancedProducts.map(p => p.id));
      
      categories.forEach(category => {
        if (balancedProducts.length >= 8) return;
        
        const categoryNonFeatured = allProducts
          .filter(product => 
            product.section === category && 
            !product.featured && 
            !usedIds.has(product.id)
          )
          .slice(0, Math.ceil(remainingSlots / categories.length));
        
        balancedProducts.push(...categoryNonFeatured);
      });
    }
    
    // Shuffle the array to avoid predictable ordering
    const shuffled = [...balancedProducts].sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, 8); // Limit to 8 products total
  };

  const featuredProducts = formatProductsForComponent(getBalancedFeaturedProducts());
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
    "description": "Uganda's premier online marketplace for gadgets, fashion, cosmetics, accessories, and property",
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
        title="Daxx Shop - Quality Gadgets, Fashion, Cosmetics & Property | Uganda's Premier Online Store"
        description="Shop premium gadgets, trendy fashion, beauty cosmetics, stylish accessories, and quality properties at Daxx Shop Uganda. Best prices, fast delivery, and excellent customer service. Your trusted online marketplace."
        keywords="Uganda online shop, gadgets Uganda, fashion Uganda, cosmetics Uganda, accessories Uganda, property Uganda, electronics Kampala, clothing store Uganda, beauty products Uganda, mobile phones Uganda, laptops Uganda, real estate Uganda, Daxx Shop"
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
                Discover our handpicked selection from all categories
              </p>
              <div className="flex justify-center space-x-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Gadgets
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Accessories
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                  Cosmetics
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  Fashion
                </span>
              </div>
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
                      {/* Category indicator badge */}
                      <div className={`absolute top-2 left-12 px-2 py-1 rounded text-xs font-semibold text-white ${
                        item.section === 'gadgets' ? 'bg-blue-500' :
                        item.section === 'accessories' ? 'bg-green-500' :
                        item.section === 'cosmetics' ? 'bg-pink-500' :
                        item.section === 'fashion' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}>
                        {item.section.charAt(0).toUpperCase() + item.section.slice(1)}
                      </div>
                      {item.originalPrice && (
                        <div className="absolute top-2 right-2 amazon-orange text-white px-2 py-1 rounded text-xs font-semibold">
                          SALE
                        </div>
                      )}
                      {item.section === 'gadgets' && item.condition && (
                        <div className={`absolute ${item.originalPrice ? 'top-10 right-2' : 'top-2 right-2'} px-2 py-1 rounded text-xs font-semibold text-white ${
                          item.condition === 'new' ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {item.condition === 'new' ? 'NEW' : 'USED'}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-sm">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-bold text-gray-900">
                          UGX {item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            UGX {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* View All Categories Links */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/gadgets" className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-blue-600 font-semibold">View All Gadgets</div>
                <div className="text-sm text-gray-600">Electronics & Tech</div>
              </Link>
              <Link to="/accessories" className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-green-600 font-semibold">View All Accessories</div>
                <div className="text-sm text-gray-600">Style & Function</div>
              </Link>
              <Link to="/cosmetics" className="text-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                <div className="text-pink-600 font-semibold">View All Cosmetics</div>
                <div className="text-sm text-gray-600">Beauty & Care</div>
              </Link>
              <Link to="/fashion" className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-purple-600 font-semibold">View All Fashion</div>
                <div className="text-sm text-gray-600">Clothing & Style</div>
              </Link>
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