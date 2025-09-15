'use client';

import Image from "next/image";

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    address,
    image,
    investorsCount,
    totalInvestment,
    investmentGoal,
    annualReturn,
    maxTerm,
    propertyType,
    distribution,
    timeLeft,
    security
  } = property;

  const investmentProgress = (totalInvestment / investmentGoal) * 100;
  const progressPercentage = Math.min(investmentProgress, 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          width={400}
          height={300}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
          {timeLeft}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Title and Address */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 font-heading">{title}</h3>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-body">{address}</span>
          </div>
        </div>

        {/* Investment Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 font-body">
              {investorsCount} Investors | ${totalInvestment.toLocaleString()} ({progressPercentage.toFixed(1)}%)
            </span>
            <span className="text-sm font-medium text-gray-900 font-body">
              ${investmentGoal.toLocaleString()} Goal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Investment Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-600 font-body">Annual Return</div>
            <div className="font-semibold text-gray-900 font-body">{annualReturn}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-body">Maximum Term</div>
            <div className="font-semibold text-gray-900 font-body">{maxTerm}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-body">Property Type</div>
            <div className="font-semibold text-gray-900 font-body">{propertyType}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-body">Distribution</div>
            <div className="font-semibold text-gray-900 font-body">{distribution}</div>
          </div>
        </div>

        {/* Security Info */}
        <div className="flex items-center mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 font-body">Security</div>
            <div className="text-xs text-gray-600 font-body">{security}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
            Invest Now
          </button>
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;