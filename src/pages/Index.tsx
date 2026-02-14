
import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import HorizontalProductScroll from '../components/HorizontalProductScroll';
import PropertyPreviewSection from '../components/PropertyPreviewSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEOHead from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';
import { useProperties } from '../hooks/useProperties';
import { usePrefetch } from '../hooks/usePrefetch';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const { data: allProducts, isLoading: productsLoading } = useProducts();
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  const { prefetchImages } = usePrefetch();

  // Prefetch visible product images
  useEffect(() => {
    if (allProducts?.length) {
      const images = allProducts
        .slice(0, 20)
        .flatMap(p => p.images)
        .filter(Boolean);
      prefetchImages(images);
    }
  }, [allProducts, prefetchImages]);

  const formatProducts = (products: any[]) =>
    products?.map(p => ({
      id: p.id,
      images: p.images || [],
      title: p.title,
      price: p.price,
      originalPrice: p.original_price,
      category: p.category,
      section: p.section,
      description: p.description || '',
      inStock: p.in_stock,
      condition: p.condition
    })) || [];

  const formatProperties = (props: any[]) =>
    props?.map(p => ({
      id: p.id,
      images: p.images || [],
      title: p.title,
      price: p.price,
      location: p.location,
      type: p.type,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      phone: "+256 123 456 789"
    })) || [];

  const getBySection = (section: string, limit = 12) =>
    allProducts?.filter(p => p.section === section).slice(0, limit) || [];

  if (productsLoading || propertiesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3 text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
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
    "contactPoint": { "@type": "ContactPoint", "telephone": "+256751173504", "contactType": "customer service" },
    "areaServed": "Uganda",
    "currenciesAccepted": "UGX",
    "paymentAccepted": "Cash, Mobile Money, WhatsApp"
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEOHead 
        title="E-Sale Uganda - Quality Gadgets, Fashion, Cosmetics & Property"
        description="Shop premium gadgets, trendy fashion, beauty cosmetics, stylish accessories, and quality properties at E-Sale Uganda. Best prices, fast delivery."
        keywords="Uganda online shop, gadgets Uganda, fashion Uganda, cosmetics Uganda, accessories Uganda, property Uganda, E-Sale Uganda"
        url="https://esaleuganda.com"
      />
      
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />
      <Hero />
      
      {/* Search */}
      <section className="py-4 md:py-6">
        <div className="text-center mb-3 px-4">
          <h2 className="text-base md:text-lg font-semibold text-foreground">
            Find What You Need
          </h2>
        </div>
        <SearchBar />
      </section>

      {/* Category Sections */}
      <HorizontalProductScroll
        title="Latest Gadgets"
        subtitle="Cutting-edge technology & electronics"
        products={formatProducts(getBySection('gadgets'))}
        viewAllLink="/gadgets"
        accentColor="bg-blue-600"
      />

      <HorizontalProductScroll
        title="Fashion Collection"
        subtitle="Trendy clothing & style"
        products={formatProducts(getBySection('fashion'))}
        viewAllLink="/fashion"
        accentColor="bg-purple-600"
      />

      <HorizontalProductScroll
        title="Tech Accessories"
        subtitle="Essential device accessories"
        products={formatProducts(getBySection('accessories'))}
        viewAllLink="/accessories"
        accentColor="bg-green-600"
      />

      <HorizontalProductScroll
        title="Beauty & Cosmetics"
        subtitle="Premium beauty & skincare"
        products={formatProducts(getBySection('cosmetics'))}
        viewAllLink="/cosmetics"
        accentColor="bg-pink-600"
      />

      <PropertyPreviewSection properties={formatProperties(properties || [])} />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
