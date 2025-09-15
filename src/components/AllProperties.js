'use client';
import AllPropertiesCard from './AllPropertiesCard';

const AllProperties = () => {
  // Sample property data matching the design
  const properties = [
    {
      id: 1,
      title: 'Los Angeles',
      location: 'Los Angeles',
      address: '8106 Herrick Ave, Los Angeles',
      image: 'https://real-estate-sable-pi.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid-one.0c43d732.jpg&w=3840&q=75',
      investors: '7',
      totalInvestment: '7.74.1M',
      fundedPercentage: 74,
      annualReturn: '5.5% + 4%',
      propertyType: 'Commercial',
      countdown: '11D : 17H : 35M',
      investmentGoal: '10.5M'
    },
    {
      id: 2,
      title: 'San Francisco, CA',
      location: 'San Francisco',
      address: '3315 21st, San Francisco',
      image: 'https://real-estate-sable-pi.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid-two.6f703aa5.jpg&w=3840&q=75',
      investors: '175',
      totalInvestment: '5.24.1M',
      fundedPercentage: 84,
      annualReturn: '5.5% + 4%',
      propertyType: 'Commercial',
      countdown: '115D : 17H : 35M',
      investmentGoal: '6.2M'
    },
    {
      id: 3,
      title: 'San Diego',
      location: 'San Diego',
      address: '358 1st Julio, San Diego',
      image: 'https://real-estate-sable-pi.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid-three.e23a0526.jpg&w=3840&q=75',
      investors: '184',
      totalInvestment: '5.84.1M',
      fundedPercentage: 94,
      annualReturn: '5.5% + 5%',
      propertyType: 'Commercial',
      countdown: '115D : 17H : 35M',
      investmentGoal: '6.2M'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">All Properties</h2>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg transition-colors">
            Browse All Properties
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <AllPropertiesCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProperties;