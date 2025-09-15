'use client';

import PropertySearch from './PropertySearch';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  // Dummy property data matching the design
  const featuredProperties = [
    {
      id: 1,
      title: 'Los Angeles',
      address: '8706 Herrick Ave, Los Angeles',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      investorsCount: 119,
      totalInvestment: 54196,
      investmentGoal: 100000,
      annualReturn: '7.9% + 3%',
      maxTerm: '36 Months',
      propertyType: 'Commercial',
      distribution: 'Monthly',
      timeLeft: '115D : 17H : 46M',
      security: '1st-Rank Mortgage'
    },
    {
      id: 2,
      title: 'Miami Beach',
      address: '1234 Ocean Drive, Miami Beach',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      investorsCount: 87,
      totalInvestment: 75000,
      investmentGoal: 150000,
      annualReturn: '8.5% + 2%',
      maxTerm: '24 Months',
      propertyType: 'Residential',
      distribution: 'Quarterly',
      timeLeft: '89D : 12H : 23M',
      security: '1st-Rank Mortgage'
    },
    {
      id: 3,
      title: 'New York',
      address: '567 Broadway, New York',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      investorsCount: 203,
      totalInvestment: 125000,
      investmentGoal: 200000,
      annualReturn: '9.2% + 4%',
      maxTerm: '48 Months',
      propertyType: 'Commercial',
      distribution: 'Monthly',
      timeLeft: '156D : 8H : 15M',
      security: '1st-Rank Mortgage'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Property Search Component */}
        <PropertySearch />
        
        {/* Featured Properties Header */}
        <div className="flex justify-between items-center mt-16 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-heading">Featured Properties</h2>
          <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center font-body">
            Browse All Properties
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium border border-gray-300 transition-colors duration-200 shadow-sm hover:shadow-md">
            Load More Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;