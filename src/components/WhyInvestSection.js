'use client';
import React from 'react';

const WhyInvestSection = () => {
  const benefits = [
    {
      id: 1,
      title: "Passive Income",
      description: "Get monthly rental income from your investment properties.",
      icon: (
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      )
    },
    {
      id: 2,
      title: "Stable Cash Flow",
      description: "Rental properties provide steady monthly income streams.",
      icon: (
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      )
    },
    {
      id: 3,
      title: "Tax Advantages",
      description: "Benefit from tax deductions and depreciation allowances.",
      icon: (
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    },
    {
      id: 4,
      title: "Capital Appreciation",
      description: "Property values tend to increase over time, building wealth.",
      icon: (
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      )
    },
    {
      id: 5,
      title: "Inflation Protection",
      description: "Real estate typically keeps pace with or exceeds inflation rates.",
      icon: (
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      )
    },
    {
      id: 6,
      title: "Diversification",
      description: "Add real estate to your investment portfolio for better risk management.",
      icon: (
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-32 translate-y-32"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-600 mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Join the future of real estate investing
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-heading">
            Why Invest in Real
            <br />
            <span className="text-purple-600">Estate?</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
            Real estate investing can help diversify investment portfolios today with up to 18% 
            annual returns.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id}
              className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                index % 2 === 1 ? 'lg:mt-8' : ''
              }`}
            >
              <div className="mb-6">
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed font-body">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl font-body">
            Start Your Investment Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyInvestSection;