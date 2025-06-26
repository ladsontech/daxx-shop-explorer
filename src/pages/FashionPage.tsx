
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Search, Loader2 } from 'lucide-react';

const FashionPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: fashion, isLoading } = useProducts('fashion');

  const filteredFashion = fashion?.filter(product => 
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
      description: product.description || '',
      inStock: product.in_stock
    })) || [];
  };

  const formattedFashion = formatProductsForComponent(filteredFashion);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading fashion items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fashion Collection
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Style meets comfort in our curated fashion line
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search fashion items..."
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
          {formattedFashion.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formattedFashion.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No fashion items found matching your search.' : 'No fashion items available at the moment.'}
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

export default FashionPage;
