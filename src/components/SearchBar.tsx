
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { searchResults, isSearching } = useSearch(searchQuery);

  const handleSearchClose = () => {
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products and properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300/50 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
          />
          <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
          {isSearchFocused && (
            <SearchResults
              results={searchResults}
              isSearching={isSearching}
              query={searchQuery}
              onClose={handleSearchClose}
            />
          )}
        </div>
      </div>

      {/* Overlay to close search when clicking outside */}
      {isSearchFocused && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={handleSearchClose}
        />
      )}
    </>
  );
};

export default SearchBar;
