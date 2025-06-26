
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useProducts } from '../hooks/useProducts';
import { useProperties } from '../hooks/useProperties';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { data: gadgets, isLoading: gadgetsLoading } = useProducts('gadgets');
  const { data: accessories, isLoading: accessoriesLoading } = useProducts('accessories');
  const { data: fashion, isLoading: fashionLoading } = useProducts('fashion');
  const { data: properties, isLoading: propertiesLoading } = useProperties();

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
      phone: "+256 123 456 789" // Default phone number since it's the site owner
    })) || [];
  };

  const formattedGadgets = formatProductsForComponent(gadgets || []);
  const formattedAccessories = formatProductsForComponent(accessories || []);
  const formattedFashion = formatProductsForComponent(fashion || []);
  const formattedProperties = formatPropertiesForComponent(properties || []);

  const featuredProducts = [
    ...formattedGadgets.slice(0, 2),
    ...formattedFashion.slice(0, 2)
  ];

  if (gadgetsLoading || accessoriesLoading || fashionLoading || propertiesLoading) {
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
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Navigation />
      <Hero />
      
      {/* Search Section */}
      <section className="py-8 bg-gradient-to-r from-blue-50 to-purple-50">
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
            {featuredProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.svg'}
                      alt={item.title}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      FEATURED
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="text-lg md:text-xl font-bold text-gray-900">
                      UGX {item.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CategorySection
        id="gadgets"
        title="Latest Gadgets"
        subtitle="Cutting-edge technology at your fingertips"
        type="products"
        items={formattedGadgets}
      />

      <CategorySection
        id="accessories"
        title="Premium Accessories"
        subtitle="Enhance your devices with quality accessories"
        type="products"
        items={formattedAccessories}
      />

      <CategorySection
        id="fashion"
        title="Fashion Collection"
        subtitle="Style meets comfort in our curated fashion line"
        type="products"
        items={formattedFashion}
      />

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
