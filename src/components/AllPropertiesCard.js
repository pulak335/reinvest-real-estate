'use client';

import Image from "next/image";

const AllPropertiesCard = ({ property }) => {
  const {
    id,
    title,
    location,
    address,
    image,
    investors,
    totalInvestment,
    fundedPercentage,
    annualReturn,
    propertyType,
    countdown,
    investmentGoal
  } = property;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200">
        {image ? (
          <Image
            width={400}
            height={300}
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-gray-600 text-sm">Property Image</span>
          </div>
        )}
      </div>
      
      {/* Property Details */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {address}
          </div>
        </div>
        
        {/* Investment Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">{investors} investors | ${totalInvestment} ({fundedPercentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${fundedPercentage}%` }}
            ></div>
          </div>
          <div className="text-right mt-1">
            <span className="text-sm font-medium text-gray-900">${investmentGoal} Goal</span>
          </div>
        </div>
        
        {/* Property Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs text-gray-500 block">Annual Return</span>
            <span className="text-sm font-medium text-gray-900">{annualReturn}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Property Type</span>
            <span className="text-sm font-medium text-gray-900">{propertyType}</span>
          </div>
        </div>
        
        {/* Security Badge */}
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Security
          </div>
          <span className="text-xs text-gray-600 ml-2">1st-Rank Mortgage</span>
        </div>
        
        {/* Countdown and Action */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">Left to Invest</span>
            <div className="font-bold text-purple-600">{countdown}</div>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200">
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPropertiesCard;