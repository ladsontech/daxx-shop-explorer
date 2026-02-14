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
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
