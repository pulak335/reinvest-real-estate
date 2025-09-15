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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-10 transform -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-200 to-blue-200 rounded-full opacity-10 transform translate-x-32 translate-y-32"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-600 mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Investors Trust Us
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-heading">
            Trusted by Over{' '}
            <span className="text-purple-600">40,000 Worldwide</span>
            <br />
            Customer since 2022
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
            We strive each property risk analysis so anyone can get started. Invest 
            smart and live financially free without stress.
          </p>
        </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-9/12 transform -translate-y-9/12 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-9/12 transform -translate-y-9/12 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        {/* Testimonial Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto relative">

          {/* Star Rating */}
          <div className="flex justify-center mb-6">
            {[...Array(currentData.rating)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-body italic">
            "{currentData.text}"
          </blockquote>

          {/* Customer Info */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {currentData.avatar}
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-lg font-heading">
                {currentData.name}
              </div>
              <div className="text-gray-600 font-body">
                {currentData.role}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;