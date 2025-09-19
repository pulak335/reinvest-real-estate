'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userType: 'particular',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the privacy policy';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', formData);
      // Redirect to login or dashboard
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/* Registration Form Container */}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Registration
            </h2>
            <p className="text-gray-600">
              Already Registered? <Link href="/login" className="text-purple-600 hover:text-purple-500 font-medium">Login</Link>
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                You are?
              </label>
              <div className="relative">
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white"
                >
                  <option value="particular">Particular</option>
                  <option value="individual">Individual</option>
                  <option value="investor">Investor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Username */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.username ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Password Confirm"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I have read and I agree to the{' '}
                <Link href="/privacy-policy" className="text-purple-600 hover:text-purple-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create My Account'
              )}
            </button>
          </form>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Building Illustrations */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1200 400" className="w-full h-auto">
              {/* Mountains/Hills Background */}
              <path d="M0,400 L0,300 L200,250 L400,280 L600,240 L800,270 L1000,230 L1200,260 L1200,400 Z" fill="rgba(139, 69, 193, 0.3)" />
              <path d="M0,400 L0,320 L150,290 L350,310 L550,280 L750,300 L950,270 L1200,290 L1200,400 Z" fill="rgba(139, 69, 193, 0.2)" />
              
              {/* Buildings */}
              <rect x="100" y="200" width="60" height="200" fill="#8B5CF6" />
              <rect x="180" y="150" width="80" height="250" fill="#7C3AED" />
              <rect x="280" y="180" width="50" height="220" fill="#8B5CF6" />
              <rect x="350" y="120" width="70" height="280" fill="#6D28D9" />
              <rect x="440" y="160" width="60" height="240" fill="#7C3AED" />
              <rect x="520" y="140" width="55" height="260" fill="#8B5CF6" />
              <rect x="600" y="170" width="65" height="230" fill="#7C3AED" />
              <rect x="690" y="130" width="75" height="270" fill="#6D28D9" />
              <rect x="790" y="160" width="50" height="240" fill="#8B5CF6" />
              <rect x="860" y="180" width="60" height="220" fill="#7C3AED" />
              <rect x="940" y="140" width="70" height="260" fill="#8B5CF6" />
              <rect x="1030" y="170" width="55" height="230" fill="#7C3AED" />
              
              {/* Building Windows */}
              <rect x="110" y="220" width="8" height="12" fill="#FCD34D" />
              <rect x="125" y="220" width="8" height="12" fill="#FCD34D" />
              <rect x="140" y="220" width="8" height="12" fill="#FCD34D" />
              <rect x="110" y="250" width="8" height="12" fill="#FCD34D" />
              <rect x="140" y="250" width="8" height="12" fill="#FCD34D" />
              
              <rect x="190" y="170" width="10" height="15" fill="#FCD34D" />
              <rect x="210" y="170" width="10" height="15" fill="#FCD34D" />
              <rect x="230" y="170" width="10" height="15" fill="#FCD34D" />
              <rect x="190" y="200" width="10" height="15" fill="#FCD34D" />
              <rect x="210" y="200" width="10" height="15" fill="#FCD34D" />
              <rect x="230" y="200" width="10" height="15" fill="#FCD34D" />
              
              {/* More windows for other buildings */}
              <rect x="360" y="140" width="8" height="12" fill="#FCD34D" />
              <rect x="375" y="140" width="8" height="12" fill="#FCD34D" />
              <rect x="390" y="140" width="8" height="12" fill="#FCD34D" />
              
              <rect x="700" y="150" width="10" height="15" fill="#FCD34D" />
              <rect x="720" y="150" width="10" height="15" fill="#FCD34D" />
              <rect x="740" y="150" width="10" height="15" fill="#FCD34D" />
            </svg>
          </div>
          
          {/* Floating Circles */}
          <div className="absolute top-20 left-20 w-24 h-24 bg-yellow-300 rounded-full opacity-80"></div>
          <div className="absolute top-40 right-32 w-16 h-16 bg-purple-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-32 left-16 w-20 h-20 bg-purple-200 rounded-full opacity-70"></div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}