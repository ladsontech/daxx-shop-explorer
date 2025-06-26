
import React from 'react';
import { ArrowRight, Smartphone, Laptop, ShirtIcon, Home } from 'lucide-react';

const Hero = () => {
  const categories = [
    { name: 'Gadgets', icon: Smartphone, color: 'bg-blue-500', link: '#gadgets' },
    { name: 'Fashion', icon: ShirtIcon, color: 'bg-pink-500', link: '#fashion' },
    { name: 'Accessories', icon: Laptop, color: 'bg-green-500', link: '#accessories' },
    { name: 'Property', icon: Home, color: 'bg-orange-500', link: '#property' }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Daxx Shop
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your one-stop marketplace for gadgets, fashion, accessories, and property. 
            Discover amazing deals and premium quality products.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-2">
            <span>Start Shopping</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <a
                key={category.name}
                href={category.link}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
