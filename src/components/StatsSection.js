'use client';
import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      number: "3000+",
      label: "Properties Being Managed",
      icon: (
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      )
    },
    {
      id: 2,
      number: "45",
      label: "Years Experience",
      icon: (
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    },
    {
      id: 3,
      number: "18%",
      label: "Returns uplift",
      icon: (
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-32 translate-y-32"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600 mb-6 shadow-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              With Revest anyone can Invest
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-heading">
              Numbers Said More
              <br />
              Than Words
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-body">
              We believe in transparency. Speaking to you in the right amount, 
              at the right time to meet your goals.
            </p>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl font-body">
              Start Investing
            </button>
          </div>
          
          {/* Right side - Stats Cards */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  index === 1 ? 'ml-8' : index === 2 ? 'ml-4' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {stat.icon}
                  <div>
                    <div className="text-3xl font-bold text-gray-900 font-heading">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-body">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;