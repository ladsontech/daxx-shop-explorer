import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Share2, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';
import { Loader2 } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: properties, isLoading, error } = useProperties();
  
  // Find the specific property
  const property = properties?.find(p => p.id === id);
  
  // Get related properties from the same type (excluding current property)
  const relatedProperties = properties?.filter(p => 
    p.type === property?.type && p.id !== property?.id
  ).slice(0, 6) || [];

  const formatPropertiesForComponent = (properties: any[]) => {
    return properties?.map(property => ({
      id: property.id,
      images: property.images || [],
      title: property.title,
      price: property.price,
      location: property.location,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      phone: "+256751173504"
    })) || [];
  };

  const formattedRelatedProperties = formatPropertiesForComponent(relatedProperties);

  const handleCall = () => {
    const phoneNumber = "+256751173504";
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    if (property) {
      const phoneNumber = "+256751173504";
      const baseUrl = window.location.origin;
      const propertyUrl = `${baseUrl}/property/${property.id}`;
      
      const message = `Hello! I'm interested in this property:\n\n` +
        `${property.title}\n` +
        `Location: ${property.location}\n` +
        `Price: UGX ${property.price.toLocaleString()}${property.type === 'rent' ? '/month' : ''}\n` +
        `Type: For ${property.type}\n` +
        `Link: ${propertyUrl}\n\n` +
        `Please provide more details and arrange a viewing. Thank you!`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-sm md:text-base">Loading property...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <Link to="/property" className="text-blue-600 hover:text-blue-800 text-sm md:text-base">
              Return to Properties
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const propertyImages = property.images && property.images.length > 0 ? property.images : ['/placeholder.svg'];
  const propertyTitle = `${property.title} | ${property.location} | Property for ${property.type} - Daxx Shop Uganda`;
  const propertyDescription = `${property.title} in ${property.location} for ${property.type}. Price: UGX ${property.price.toLocaleString()}${property.type === 'rent' ? '/month' : ''}. ${property.bedrooms ? `${property.bedrooms} bedrooms, ` : ''}${property.bathrooms ? `${property.bathrooms} bathrooms, ` : ''}${property.area ? `${property.area} sqft. ` : ''}Contact us for viewing and more details.`;
  const propertyKeywords = `${property.title}, ${property.location}, property ${property.type} Uganda, real estate Uganda, ${property.type === 'sale' ? 'house for sale' : 'house for rent'} ${property.location}, property Uganda, Daxx Shop`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": `${property.title} in ${property.location}`,
    "image": propertyImages,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressCountry": "Uganda"
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "UGX",
      "seller": {
        "@type": "Organization",
        "name": "Esale Uganda",
        "url": "https://daxxshop.com"
      }
    },
    "floorSize": property.area ? {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitText": "sqft"
    } : undefined,
    "numberOfRooms": property.bedrooms || undefined,
    "numberOfBathroomsTotal": property.bathrooms || undefined
  };

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `${property.title} in ${property.location}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Property link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <SEOHead
        title={propertyTitle}
        description={propertyDescription}
        keywords={propertyKeywords}
        image={propertyImages[0]}
        url={`https://daxxshop.com/property/${property.id}`}
        type="article"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Back Button */}
        <Link to="/property" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 md:mb-6 text-sm md:text-base">
          <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          Back to Properties
        </Link>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Image Gallery */}
          <div className="space-y-2 md:space-y-4">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={propertyImages[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {propertyImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-16 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-xs md:text-sm text-gray-600">{property.location}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm">Share</span>
                </button>
              </div>
              
              <h1 className="font-bold text-gray-900 mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl leading-tight">
                {property.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3 md:mb-4 space-y-2 sm:space-y-0">
                <span className="font-bold text-gray-900 text-xl md:text-2xl">
                  UGX {property.price.toLocaleString()}
                  {property.type === 'rent' && <span className="text-lg md:text-xl text-gray-600">/month</span>}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.type === 'sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  For {property.type === 'sale' ? 'Sale' : 'Rent'}
                </span>
              </div>
            </div>

            {/* Property Features */}
            {(property.bedrooms || property.bathrooms || property.area) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Features</h3>
                <div className="grid grid-cols-3 gap-4">
                  {property.bedrooms && (
                    <div className="text-center">
                      <Bed className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{property.bedrooms}</div>
                      <div className="text-xs text-gray-600">Bedroom{property.bedrooms !== 1 ? 's' : ''}</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <Bath className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{property.bathrooms}</div>
                      <div className="text-xs text-gray-600">Bathroom{property.bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                  )}
                  {property.area && (
                    <div className="text-center">
                      <Square className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{property.area}</div>
                      <div className="text-xs text-gray-600">Sq Ft</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">+256 751 173504</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">WhatsApp Available</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-4 pt-2">
              <button
                onClick={handleCall}
                className="w-full py-3 md:py-3 px-4 md:px-6 rounded-lg font-semibold text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Phone className="h-4 w-4 md:h-5 md:w-5" />
                <span>Call Now</span>
              </button>
              
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 md:py-3 px-4 md:px-6 rounded-lg font-semibold text-base md:text-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                <span>WhatsApp Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Properties Section */}
        {formattedRelatedProperties.length > 0 && (
          <section className="mt-12 md:mt-16">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Similar Properties
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                More properties for {property.type} you might be interested in
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {formattedRelatedProperties.map((relatedProperty) => (
                <PropertyCard key={relatedProperty.id} {...relatedProperty} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;