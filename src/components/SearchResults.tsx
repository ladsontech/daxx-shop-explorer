
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchResult } from '../hooks/useSearch';
import { MapPin, Tag } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  isSearching: boolean;
  query: string;
  onClose: () => void;
}

const SearchResults = ({ results, isSearching, query, onClose }: SearchResultsProps) => {
  if (!query.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
      {isSearching ? (
        <div className="p-4 text-center text-gray-500">Searching...</div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No results found for "{query}"
        </div>
      ) : (
        <div className="p-2">
          <div className="text-sm text-gray-500 mb-2 px-2">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </div>
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              to={result.type === 'product' ? `/product/${result.id}` : '#'}
              onClick={onClose}
              className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={result.images[0] || '/placeholder.svg'}
                  alt={result.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {result.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-semibold text-blue-600">
                      UGX {result.price.toLocaleString()}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {result.type}
                    </span>
                  </div>
                  {result.category && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Tag className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{result.category}</span>
                    </div>
                  )}
                  {result.location && (
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{result.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
