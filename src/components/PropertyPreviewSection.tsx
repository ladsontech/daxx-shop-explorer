
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const previewProperties = properties.slice(0, 8);

  if (properties.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-5 md:py-8 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
              Featured Properties
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Premium properties across Uganda
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <button onClick={() => scroll('left')} className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors">
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button onClick={() => scroll('right')} className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors">
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
            
            <Link
              to="/property"
              className="flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="block md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {previewProperties.map((property) => (
              <div key={property.id} className="flex-shrink-0 w-[200px] snap-start">
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyPreviewSection;
