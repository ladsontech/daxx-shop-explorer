
import React from 'react';
import ProductCard from './ProductCard';
import PropertyCard from './PropertyCard';

interface CategorySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  type: 'products' | 'property';
  items: any[];
}

const CategorySection: React.FC<CategorySectionProps> = ({
  id,
  title,
  subtitle,
  type,
  items
}) => {
  return (
    <section id={id} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className={`grid gap-6 ${
          type === 'property' 
            ? 'md:grid-cols-2 lg:grid-cols-3' 
            : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {items.map((item) => (
            type === 'property' ? (
              <PropertyCard key={item.id} {...item} />
            ) : (
              <ProductCard key={item.id} {...item} />
            )
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            View All {title}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
