'use client';
import React from 'react';
import { FaSearch, FaEye, FaChartLine } from 'react-icons/fa';

const HowToGetStarted = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearch className="text-2xl" />,
      title: "Browse Properties",
      description: "Search properties from the top goal from our huge variety of rental global properties."
    },
    {
      id: 2,
      icon: <FaEye className="text-2xl" />,
      title: "View Details & Invest",
      description: "View detailed metrics for this property like rental yield, cap rate, and invest the minimum amount."
    },
    {
      id: 3,
      icon: <FaChartLine className="text-2xl" />,
      title: "Earn and Track",
      description: "The track full visibility into the performance of your investment. Gain your total returns."
    }
  ];

  return (
    <section className="py-16 px-4 bg-purple-50 bg-opacity-5" style={{backgroundColor: 'rgba(147, 51, 234, 0.05)'}}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-purple-600 font-medium mb-2 font-body">We&apos;re changing the way you invest.</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
            It&apos;s Easy to Get Started.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-body">
            Starting with steps based on secure and risk-tolerant free strategies, our cryptocurrency content 
            will help you learn how to build a cryptocurrency investment strategy to help you succeed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              {/* Step Number and Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-600">{step.icon}</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {String(step.id).padStart(2, '0')}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-body">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Illustration */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-64 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-2xl relative overflow-hidden">
            {/* City Skyline Illustration */}
            <div className="absolute bottom-0 left-0 right-0">
              {/* Buildings */}
              <div className="flex items-end justify-center space-x-2 px-4">
                <div className="w-8 h-16 bg-purple-600 rounded-t-sm"></div>
                <div className="w-6 h-12 bg-blue-700 rounded-t-sm"></div>
                <div className="w-10 h-20 bg-purple-600 rounded-t-sm relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full"></div>
                </div>
                <div className="w-8 h-14 bg-purple-500 rounded-t-sm"></div>
                <div className="w-6 h-10 bg-purple-500 rounded-t-sm"></div>
                <div className="w-12 h-24 bg-purple-700 rounded-t-sm"></div>
                <div className="w-7 h-18 bg-purple-600 rounded-t-sm"></div>
              </div>
              
              {/* Ground */}
              <div className="w-full h-8 bg-green-500 mt-1"></div>
            </div>
            
            {/* Sun */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-yellow-300 rounded-full"></div>
            
            {/* Person with Device */}
            <div className="absolute bottom-12 right-8">
              <div className="w-8 h-12 bg-orange-400 rounded-t-full"></div>
              <div className="w-6 h-4 bg-purple-600 rounded mt-1 ml-1"></div>
            </div>
            
            {/* Play Button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
                <div className="w-0 h-0 border-l-6 border-l-purple-600 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToGetStarted;