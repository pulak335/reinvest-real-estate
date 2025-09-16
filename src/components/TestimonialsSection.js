'use client';
import React, { useState } from 'react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Allan Murphy",
      role: "Investor",
      rating: 5,
      text: "Very trustworthy and clearly platform to invest in real estate. Safe investment with monthly payouts. Highly recommend!",
      avatar: "AM"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Property Manager",
      rating: 5,
      text: "Excellent platform for real estate investment. The returns are consistent and the team is very professional. Great experience overall!",
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Real Estate Investor",
      rating: 5,
      text: "I've been investing through this platform for over a year now. The transparency and regular updates make it my go-to choice for real estate investments.",
      avatar: "MC"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-10 transform -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 lg:-translate-x-48 lg:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-tl from-purple-200 to-blue-200 rounded-full opacity-10 transform translate-x-16 translate-y-16 sm:translate-x-24 sm:translate-y-24 lg:translate-x-32 lg:translate-y-32"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 rounded-full text-xs sm:text-sm font-medium text-purple-600 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-2"></span>
            Investors Trust Us
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight font-heading px-2">
            Trusted by Over{' '}
            <span className="text-purple-600">40,000 Worldwide</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Customer since 2022
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-body px-2">
            We strive each property risk analysis so anyone can get started. Invest 
            smart and live financially free without stress.
          </p>
        </div>

        {/* Testimonial Container with Navigation */}
        <div className="relative">
          {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
          <button 
            onClick={prevTestimonial}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 lg:-translate-x-20 w-10 h-10 lg:w-12 lg:h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full items-center justify-center transition-colors duration-200 shadow-lg z-10"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 lg:translate-x-20 w-10 h-10 lg:w-12 lg:h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full items-center justify-center transition-colors duration-200 shadow-lg z-10"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 lg:p-12 max-w-2xl mx-auto relative transition-transform duration-300 ease-in-out">

            {/* Star Rating */}
            <div className="flex justify-center mb-4 sm:mb-6 space-x-1">
              {[...Array(currentData.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-body italic px-2">
              &ldquo;{currentData.text}&rdquo;
            </blockquote>

            {/* Customer Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                {currentData.avatar}
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-gray-900 text-base sm:text-lg font-heading">
                  {currentData.name}
                </div>
                <div className="text-gray-600 font-body text-sm sm:text-base">
                  {currentData.role}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Arrows - Only visible on mobile */}
        <div className="flex md:hidden justify-center space-x-4 mt-6">
          <button 
            onClick={prevTestimonial}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;