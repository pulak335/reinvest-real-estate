'use client';
import React from 'react';
import Image from 'next/image';

const InvestmentProcessSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-30 transform -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-100 to-purple-100 rounded-full opacity-30 transform translate-x-32 translate-y-32"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="https://real-estate-sable-pi.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarket-illustration.90a766eb.png&w=828&q=75"
                alt="Real Estate Investment Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="lg:pl-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-600 mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Real exposure to the real estate market
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-heading">
              <span className="text-purple-600">You Invest,</span> Revest
              <br />
              Does the Rest
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-body">
              Hassle-free real estate investing. We take care of all the 
              paperwork and property management, so you can focus on the returns.
            </p>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl font-body">
              Start Investing
            </button>
            
            {/* Additional features */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-body">Professional property management</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-body">Transparent reporting and analytics</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-body">Hassle-free investment experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentProcessSection;