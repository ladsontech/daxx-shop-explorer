
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import FilterSection from '../components/FilterSection';
import HorizontalProductScroll from '../components/HorizontalProductScroll';
import PropertyPreviewSection from '../components/PropertyPreviewSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEOHead from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';
import { useProperties } from '../hooks/useProperties';
import { Link } from 'react-router-dom';
import { Loader2, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
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

  // Get products by category for horizontal scrolling - increased limit for two rows
  const getProductsBySection = (section: string, limit: number = 16) => {
    if (!allProducts) return [];
    return allProducts
      .filter(product => product.section === section)
      .slice(0, limit);
  };

  // Balance featured products across all categories - increased to show more products
  const getBalancedFeaturedProducts = () => {
    if (!allProducts) return [];
    
    const categories = ['gadgets', 'accessories', 'cosmetics', 'fashion'];
    const maxPerCategory = 4; // Increased from 2 to 4 products per category
    const balancedProducts: any[] = [];
    
    // Get featured products from each category
    categories.forEach(category => {
      const categoryProducts = allProducts
        .filter(product => product.section === category && product.featured)
        .slice(0, maxPerCategory); // Limit per category
      
      balancedProducts.push(...categoryProducts);
    });
    
    // If we don't have enough featured products, fill with non-featured products
    if (balancedProducts.length < 16) { // Increased from 8 to 16
      const remainingSlots = 16 - balancedProducts.length;
      const usedIds = new Set(balancedProducts.map(p => p.id));
      
      categories.forEach(category => {
        if (balancedProducts.length >= 16) return;
        
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
    
    return shuffled.slice(0, 16); // Increased limit to 16 products total
  };

  // Filter products based on active filter
  const getFilteredProducts = () => {
    const allFeatured = getBalancedFeaturedProducts();
    
    if (activeFilter === 'all') {
      return allFeatured;
    }
    
    return allFeatured.filter(product => product.section === activeFilter);
  };

  const featuredProducts = formatProductsForComponent(getFilteredProducts());
  const formattedProperties = formatPropertiesForComponent(properties || []);

  const productFilters = [
    { label: 'All Products', value: 'all' },
    { label: 'Gadgets', value: 'gadgets' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Cosmetics', value: 'cosmetics' }
  ];

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
    "name": "E-Sale Uganda",
    "description": "Uganda's premier online marketplace for gadgets, fashion, cosmetics, accessories, and property",
    "url": "https://esaleuganda.com",
    "logo": "https://esaleuganda.com/images/logo.png",
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
    <div className="min-h-screen bg-white pb-20 md:pb-0 mobile-contained">
      <SEOHead 
        title="E-Sale Uganda - Quality Gadgets, Fashion, Cosmetics & Property | Uganda's Premier Online Store"
        description="Shop premium gadgets, trendy fashion, beauty cosmetics, stylish accessories, and quality properties at E-Sale Uganda. Best prices, fast delivery, and excellent customer service. Your trusted online marketplace."
        keywords="Uganda online shop, gadgets Uganda, fashion Uganda, cosmetics Uganda, accessories Uganda, property Uganda, electronics Kampala, clothing store Uganda, beauty products Uganda, mobile phones Uganda, laptops Uganda, real estate Uganda, E-Sale Uganda"
        url="https://esaleuganda.com"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      <Hero />
      
      {/* Search Section */}
      <section className="py-6 md:py-8 amazon-gray">
        <div className="text-center mb-4 md:mb-6 px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Find What You're Looking For
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Search through our products and properties
          </p>
        </div>
        <SearchBar />
      </section>

      {/* Category Horizontal Scrolls */}
      <HorizontalProductScroll
        title="Latest Gadgets"
        subtitle="Discover cutting-edge technology and electronics"
        products={formatProductsForComponent(getProductsBySection('gadgets'))}
        viewAllLink="/gadgets"
        accentColor="bg-blue-600"
      />

      <HorizontalProductScroll
        title="Fashion Collection"
        subtitle="Trendy clothing and stylish accessories"
        products={formatProductsForComponent(getProductsBySection('fashion'))}
        viewAllLink="/fashion"
        accentColor="bg-purple-600"
      />

      <HorizontalProductScroll
        title="Tech Accessories"
        subtitle="Essential accessories for your devices"
        products={formatProductsForComponent(getProductsBySection('accessories'))}
        viewAllLink="/accessories"
        accentColor="bg-green-600"
      />

      <HorizontalProductScroll
        title="Beauty & Cosmetics"
        subtitle="Premium beauty products and skincare"
        products={formatProductsForComponent(getProductsBySection('cosmetics'))}
        viewAllLink="/cosmetics"
        accentColor="bg-pink-600"
      />

      {/* Property Preview Section */}
      <PropertyPreviewSection properties={formattedProperties} />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
