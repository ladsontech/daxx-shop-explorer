
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';
import { gadgets, accessories, fashion, properties } from '../data/sampleData';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      
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
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...gadgets.slice(0, 2), ...fashion.slice(0, 2)].map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    FEATURED
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xl font-bold text-gray-900">
                    ${item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategorySection
        id="gadgets"
        title="Latest Gadgets"
        subtitle="Cutting-edge technology at your fingertips"
        type="products"
        items={gadgets}
      />

      <CategorySection
        id="accessories"
        title="Premium Accessories"
        subtitle="Enhance your devices with quality accessories"
        type="products"
        items={accessories}
      />

      <CategorySection
        id="fashion"
        title="Fashion Collection"
        subtitle="Style meets comfort in our curated fashion line"
        type="products"
        items={fashion}
      />

      <CategorySection
        id="property"
        title="Property Listings"
        subtitle="Find your perfect home or investment opportunity"
        type="property"
        items={properties}
      />

      <Footer />
    </div>
  );
};

export default Index;
