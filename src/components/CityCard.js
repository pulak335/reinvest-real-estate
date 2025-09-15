'use client';

const CityCard = ({ city, propertyCount, icon, color = 'purple' }) => {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
  };

  const iconComponents = {
    diamond: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L24 12L16 28L8 12L16 4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M8 12H24" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 4L10 12L16 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 4L22 12L16 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    building: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="20" height="20" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" rx="2"/>
        <rect x="10" y="12" width="3" height="3" fill="currentColor"/>
        <rect x="15" y="12" width="3" height="3" fill="currentColor"/>
        <rect x="19" y="12" width="3" height="3" fill="currentColor"/>
        <rect x="10" y="17" width="3" height="3" fill="currentColor"/>
        <rect x="15" y="17" width="3" height="3" fill="currentColor"/>
        <rect x="19" y="17" width="3" height="3" fill="currentColor"/>
        <rect x="13" y="22" width="6" height="6" fill="currentColor"/>
      </svg>
    ),
    star: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L20 12H28L22 18L24 28L16 24L8 28L10 18L4 12H12L16 4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          {iconComponents[icon] || iconComponents.diamond}
        </div>
        
        {/* City Name */}
        <h3 className="text-xl font-semibold text-gray-900">{city}</h3>
        
        {/* Property Count */}
        <p className="text-gray-600 text-sm">{propertyCount}+ Properties</p>
        
        {/* Explore Button */}
        <button className="text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors duration-200">
          Explore
        </button>
      </div>
    </div>
  );
};

export default CityCard;