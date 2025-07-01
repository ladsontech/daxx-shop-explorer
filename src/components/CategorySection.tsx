import React from 'react';
import { Link } from 'react-router-dom';
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
  // Determine the correct link based on the section type
  const getViewAllLink = () => {
    if (type === 'property') {
      return '/property';
    }
    // For products, we could add logic here if needed
    return '#';
  };

  return (
    <section id={id} className="py-16 amazon-gray">
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
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
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
          <Link 
            to={getViewAllLink()}
            className="amazon-orange amazon-hover-orange text-white px-8 py-3 rounded font-semibold amazon-shadow transition-all duration-300 transform hover:-translate-y-1 inline-block"
          >
            View All {title}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;