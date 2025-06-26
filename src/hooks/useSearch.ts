
import { useState, useEffect } from 'react';
import { useProducts } from './useProducts';
import { useProperties } from './useProperties';

export interface SearchResult {
  id: string;
  title: string;
  price: number;
  type: 'product' | 'property';
  category?: string;
  location?: string;
  images: string[];
  description?: string;
}

export const useSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: products } = useProducts();
  const { data: properties } = useProperties();

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    const searchQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search products
    if (products) {
      const matchingProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery)
      );

      results.push(...matchingProducts.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        type: 'product' as const,
        category: product.category,
        images: product.images || [],
        description: product.description || ''
      })));
    }

    // Search properties
    if (properties) {
      const matchingProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchQuery) ||
        property.location.toLowerCase().includes(searchQuery) ||
        property.type.toLowerCase().includes(searchQuery)
      );

      results.push(...matchingProperties.map(property => ({
        id: property.id,
        title: property.title,
        price: property.price,
        type: 'property' as const,
        location: property.location,
        images: property.images || []
      })));
    }

    setSearchResults(results);
    setIsSearching(false);
  }, [query, products, properties]);

  return { searchResults, isSearching };
};
