
import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { ArrowRight } from 'lucide-react';

interface Property {
  id: string;
  images: string[];
  title: string;
  price: number;
  location: string;
  type: 'sale' | 'rent';
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  phone: string;
}

interface PropertyPreviewSectionProps {
  properties: Property[];
}

const PropertyPreviewSection: React.FC<PropertyPreviewSectionProps> = ({ properties }) => {
  // Show only the first 6 properties on homepage
  const previewProperties = properties.slice(0, 6);

  if (properties.length === 0) return null;

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Featured Properties
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8">
            Discover premium properties across Uganda - from modern apartments to luxury homes
          </p>
          
          {/* View All Button - Desktop */}
          <div className="hidden md:block">
            <Link 
              to="/property"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>View All Properties</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {previewProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* View All Button - Mobile */}
        <div className="md:hidden text-center">
          <Link 
            to="/property"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <span>View All Properties ({properties.length})</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Stats */}
        {properties.length > 6 && (
          <div className="text-center mt-6 text-sm md:text-base text-gray-600">
            Showing {previewProperties.length} of {properties.length} properties
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyPreviewSection;
