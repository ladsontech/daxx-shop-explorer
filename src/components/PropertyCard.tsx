
import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
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

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  images,
  price,
  location,
  type
}) => {
  const displayImage = images && images.length > 0 ? images[0] : '/placeholder.svg';

  return (
    <Link to={`/property/${id}`} className="block group">
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={displayImage}
            alt="Property"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-white text-xs font-medium ${
            type === 'sale' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            For {type === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>
        
        <div className="p-3">
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="text-xs truncate">{location}</span>
          </div>
          
          <div className="text-base md:text-lg font-bold text-foreground">
            UGX {price.toLocaleString()}{type === 'rent' && <span className="text-xs font-normal text-muted-foreground">/mo</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
