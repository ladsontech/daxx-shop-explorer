import React from 'react';
import { MapPin, Bed, Bath, Square, Phone, MessageCircle } from 'lucide-react';
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
  type,
  bedrooms,
  bathrooms,
  area,
  phone
}) => {
  const displayImage = images && images.length > 0 ? images[0] : '/placeholder.svg';
  const contactPhone = "+256751173504";

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${contactPhone}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hello! I'm interested in this property: ${title} in ${location} for UGX ${price.toLocaleString()}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${contactPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="text-2xl font-bold text-blue-600 mb-3">
            UGX {price.toLocaleString()}{type === 'rent' && '/month'}
          </div>
          
          {(bedrooms || bathrooms || area) && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              {bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{bedrooms} bed</span>
                </div>
              )}
              {bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{bathrooms} bath</span>
                </div>
              )}
              {area && (
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{area} sqft</span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex space-x-2">
            <button 
              onClick={handleCall}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </button>
            <button 
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;