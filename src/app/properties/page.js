'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard';
import { useProperties } from '../../hooks/useProperties';
import Navbar from '@/components/Navbar';
import TestimonialsSection from '@/components/TestimonialsSection';
import InvestmentProcessSection from '@/components/InvestmentProcessSection';
import Footer from '@/components/Footer';

const PropertiesPage = () => {
  const { properties, loading, error, loadProperties } = useProperties();
  
  // Load properties when needed
  if (properties.length === 0 && !loading && !error) {
    loadProperties();
  }
  
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: ''
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Load properties when component renders and conditions are met
  // Note: Using direct call instead of useEffect due to SSR/hydration issues
  // This ensures properties are loaded reliably on both server and client
  


  const filteredProperties = properties.filter(property => {
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (property.price < min || property.price > max)) {
        return false;
      }
      if (!max && property.price < min) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section with Background */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat py-20 px-4"
        style={{
          backgroundImage: 'url(https://real-estate-sable-pi.vercel.app/_next/static/media/banner-two-bg.2c6b999e.png)'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/60"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Browse Properties
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-body">
            Discover your next investment opportunity from our curated selection of premium properties
          </p>
          
          {/* Search Filters */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {/* Location Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 font-body">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city or area"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body"
                />
              </div>
              
              {/* Property Type Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 font-body">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body"
                >
                  <option value="">All Types</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 font-body">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body"
                >
                  <option value="">Any Price</option>
                  <option value="0-500000">Under $500K</option>
                  <option value="500000-1000000">$500K - $1M</option>
                  <option value="1000000-2000000">$1M - $2M</option>
                  <option value="2000000">$2M+</option>
                </select>
              </div>
              
              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 font-body">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Properties Grid Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600 mt-2 font-body">
                {filteredProperties.length} properties found
              </p>
            </div>
            
            {/* Sort Options */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-body">Sort by:</span>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600 font-body">Loading properties...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 font-body">Error loading properties. Please try again.</p>
            </div>
          )}
          
          {/* Properties Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          {/* No Results */}
          {!loading && !error && filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">No properties found</h3>
              <p className="text-gray-600 font-body">Try adjusting your search filters to see more results.</p>
            </div>
          )}
          
          {/* Load More Button */}
          {!loading && !error && filteredProperties.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 font-body">
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </div>
      <TestimonialsSection />
      <InvestmentProcessSection />
      <Footer />
    </div>
  );
};

export default PropertiesPage;