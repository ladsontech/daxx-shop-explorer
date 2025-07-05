
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import PropertyCard from '../components/PropertyCard';
import SEOHead from '../components/SEOHead';
import { useProperties } from '../hooks/useProperties';
import { Search, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PropertyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: properties, isLoading } = useProperties();

  const filteredProperties = properties?.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.type.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
      phone: "+256 123 456 789"
    })) || [];
  };

  const formattedProperties = formatPropertiesForComponent(filteredProperties);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Property Listings - E-Sale Uganda",
    "description": "Find houses, apartments, land, and commercial properties for sale and rent in Uganda",
    "url": "https://daxxshop.com/property",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": formattedProperties.length,
      "itemListElement": formattedProperties.slice(0, 10).map((property, index) => ({
        "@type": "RealEstateListing",
        "position": index + 1,
        "name": property.title,
        "url": `https://daxxshop.com/property/${property.id}`,
        "image": property.images[0] || "https://daxxshop.com/placeholder.svg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.location,
          "addressCountry": "Uganda"
        },
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": "UGX"
        }
      }))
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0 mobile-contained">
      <SEOHead
        title="Property Listings Uganda | Houses, Apartments & Land for Sale/Rent - E-Sale Uganda"
        description="Find houses, apartments, land, and commercial properties for sale and rent in Uganda. Prime locations in Kampala, Entebbe, Jinja and across Uganda. Best property deals."
        keywords="property Uganda, houses for sale Uganda, apartments for rent Uganda, land for sale Uganda, real estate Uganda, property Kampala, houses Kampala, apartments Kampala, commercial property Uganda"
        url="https://daxxshop.com/property"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navigation />
      
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Property Listings Uganda
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find your perfect home or investment opportunity - Houses, Apartments & Land
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search properties by title, location, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300/50 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
            />
            <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {formattedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formattedProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No properties found matching your search.' : 'No properties available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PropertyPage;
