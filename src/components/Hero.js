'use client';

import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 grayscale">
        <Image
          width={1920}
          height={1080}
          src="https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2023/07/real-estate-banner.webp"
          alt="Real Estate Investment Illustration"
          className="w-full h-full object-cover object-center opacity-90"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-screen">
          <div className="w-full lg:w-1/2 py-20">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600 mb-6 shadow-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              A smarter, better way to invest
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 text-white font-heading">
              Real Estate
              <br />
              Investment
              <br />
              For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Everyone
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed font-body">
              Buy shares of rental properties, earn monthly income, and watch your money grow
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                Start Exploring
              </button>
              <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl border border-gray-200">
                Get Funding
              </button>
            </div>

            {/* Stats or Features */}
            <div className="mt-12 grid grid-cols-3 gap-8 ">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-50">$2.5M+</div>
                <div className="text-sm text-gray-300">Properties Funded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-50">15K+</div>
                <div className="text-sm text-gray-300">Active Investors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-50">8.5%</div>
                <div className="text-sm text-gray-300">Avg. Returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute bottom-32 left-10 w-16 h-16 bg-green-400 rounded-full opacity-60 animate-bounce"></div>
      
      {/* Floating Cards - Matching the design */}
      <div className="absolute top-1/4 right-1/4 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Monthly Income</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">$1,247</div>
          <div className="text-xs text-green-600">↗ +12.5%</div>
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/3 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Portfolio Value</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">$45.2K</div>
          <div className="text-xs text-green-600">↗ +8.3%</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;