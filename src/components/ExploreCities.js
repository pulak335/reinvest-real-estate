'use client';
import { useState } from 'react';
import CityCard from './CityCard';

const ExploreCities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const citiesPerPage = 3;
  
  const cities = [
    {
      id: 1,
      name: 'The Diego',
      propertyCount: '201',
      icon: 'diamond',
      color: 'purple'
    },
    {
      id: 2,
      name: 'San Francisco',
      propertyCount: '201',
      icon: 'building',
      color: 'blue'
    },
    {
      id: 3,
      name: 'San Diego',
      propertyCount: '201',
      icon: 'star',
      color: 'indigo'
    },
    {
      id: 4,
      name: 'Los Angeles',
      propertyCount: '185',
      icon: 'diamond',
      color: 'purple'
    },
    {
      id: 5,
      name: 'New York',
      propertyCount: '320',
      icon: 'building',
      color: 'blue'
    },
    {
      id: 6,
      name: 'Miami',
      propertyCount: '150',
      icon: 'star',
      color: 'indigo'
    },
    {
      id: 7,
      name: 'Chicago',
      propertyCount: '275',
      icon: 'building',
      color: 'blue'
    },
    {
      id: 8,
      name: 'Austin',
      propertyCount: '95',
      icon: 'diamond',
      color: 'purple'
    },
    {
      id: 9,
      name: 'Seattle',
      propertyCount: '180',
      icon: 'star',
      color: 'indigo'
    }
  ];

  const maxIndex = Math.max(0, cities.length - citiesPerPage);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const visibleCities = cities.slice(currentIndex, currentIndex + citiesPerPage);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore By <span className="text-purple-600">Cities</span>
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-colors duration-200 ${
                currentIndex === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 hover:border-purple-300'
              }`}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-colors duration-200 ${
                currentIndex >= maxIndex 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 hover:border-purple-300'
              }`}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {visibleCities.map((city) => (
            <CityCard
              key={city.id}
              city={city.name}
              propertyCount={city.propertyCount}
              icon={city.icon}
              color={city.color}
            />
          ))}
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(cities.length / citiesPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                Math.floor(currentIndex / citiesPerPage) === index
                  ? 'bg-purple-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCities;