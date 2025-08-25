
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
  title,
  price,
  location,
  type
}) => {
  const displayImage = images && images.length > 0 ? images[0] : '/placeholder.svg';

  return (
    <Link to={`/property/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative">
          <img
            src={displayImage}
            alt={title}
            className="w-full aspect-square object-cover"
          />
          <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-white text-sm font-semibold ${
            type === 'sale' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            For {type === 'sale' ? 'Sale' : 'Rent'}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="text-2xl font-bold text-blue-600">
            UGX {price.toLocaleString()}{type === 'rent' && '/month'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
