'use client';

import { useState } from 'react';

const PropertySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);

  const locations = [
    'Los Angeles',
    'New York',
    'Miami',
    'Chicago',
    'San Francisco',
    'Austin',
    'Seattle',
    'Denver'
  ];

  const propertyTypes = [
    'Commercial',
    'Residential',
    'Industrial',
    'Retail',
    'Office',
    'Mixed Use'
  ];

  const handleSearch = () => {
    console.log('Searching for:', { searchTerm, selectedLocation, selectedPropertyType });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mx-4 -mt-16 relative z-20 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for properties"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="flex items-center justify-between w-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700">
                {selectedLocation || 'Select Location'}
              </span>
            </div>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isLocationOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
              <div className="py-1">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsLocationOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsPropertyTypeOpen(!isPropertyTypeOpen)}
            className="flex items-center justify-between w-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-gray-700">
                {selectedPropertyType || 'Property Type'}
              </span>
            </div>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isPropertyTypeOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
              <div className="py-1">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedPropertyType(type);
                      setIsPropertyTypeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default PropertySearch;