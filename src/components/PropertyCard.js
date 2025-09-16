'use client';

import Image from "next/image";

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    location,
    address,
    images,
    investment,
    type,
    price
  } = property;

  const progressPercentage = investment?.returnPercentage || 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          width={400}
          height={300}
          src={images?.[0] || '/images/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
          {investment?.timeLeft || 'N/A'}
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
            <span className="text-sm font-body">{address?.street}, {address?.city}</span>
          </div>
        </div>

        {/* Investment Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 font-body">
              {investment?.investors || 0} Investors | ${investment?.totalInvestment?.toLocaleString() || price?.toLocaleString()} ({progressPercentage.toFixed(1)}%)
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
            <div className="font-semibold text-gray-900 font-body">{investment?.annualReturn || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-body">Left to Invest</div>
            <div className="font-semibold text-gray-900 font-body">{investment?.timeLeft || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-body">Property Type</div>
            <div className="font-semibold text-gray-900 font-body">{type}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-body">Unit to Invest</div>
            <div className="font-semibold text-gray-900 font-body">{investment?.timeLeft || 'N/A'}</div>
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