
import React from 'react';

interface FilterSectionProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: { label: string; value: string }[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  activeFilter,
  onFilterChange,
  filters
}) => {
  return (
    <div className="bg-white py-3 md:py-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-lg p-0.5 md:p-1 shadow-sm overflow-x-auto max-w-full">
            <div className="flex space-x-1 md:space-x-0 min-w-max">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => onFilterChange(filter.value)}
                  className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeFilter === filter.value
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
