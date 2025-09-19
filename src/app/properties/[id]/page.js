"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../hooks/useAuth';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Simulate API call with dummy data
        const dummyProperty = {
          id: parseInt(id),
          title: "Modern Apartment in Berlin",
          location: "Berlin, Germany",
          price: 450000,
          type: "Apartment",
          status: "available",
          images: [
            "/images/property-1.jpg",
            "/images/property-2.jpg",
            "/images/property-3.jpg"
          ],
          description: "This stunning modern apartment offers contemporary living in the heart of Berlin. With high-end finishes and an open floor plan, it's perfect for urban professionals.",
          details: {
            bedrooms: 2,
            bathrooms: 2,
            squareFeet: 1200,
            yearBuilt: 2020,
            parking: "1 Space"
          },
          investment: {
            annualReturn: "8.5%",
            returnPercentage: 65,
            investors: 127
          },
          monthlyRent: 2800,
          managementFee: "8%",
          serviceCharge: 1200,
          minInvestment: 3000,
          investmentTerm: "36 months",
          currentGrowth: "12.3",
          occupancyRate: 95
        };
        
        setProperty(dummyProperty);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateReturns = (amount) => {
    const annualReturn = parseFloat(property?.investment?.annualReturn?.replace('%', '') || 8.5);
    return (amount * annualReturn) / 100;
  };

  const handleInvestment = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowInvestmentModal(true);
  };

  const confirmInvestment = () => {
    // Handle investment logic here
    console.log('Investment confirmed:', investmentAmount);
    setShowInvestmentModal(false);
    setInvestmentAmount('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600">The property you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Property Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-gray-600 mb-4">{property.location}</p>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-purple-600">{formatCurrency(property.price)}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
                  {property.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="relative h-96">
                <img
                  src={property.images[activeImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{property.occupancyRate}%</div>
                  <div className="text-gray-600">Occupancy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{property.investment?.annualReturn}</div>
                  <div className="text-gray-600">Annual Return</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{property.investment?.investors}</div>
                  <div className="text-gray-600">Investors</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'property-details', label: 'Property Details' },
                    { id: 'financial-info', label: 'Financial Information' },
                    { id: 'calculator', label: 'Investment Calculator' },
                    { id: 'amenities', label: 'Amenities' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h3>
                      <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Invest?</h3>
                      <div className="space-y-3">
                        {[
                          'Prime location in Berlin city center',
                          'High rental demand and occupancy rates',
                          'Professional property management',
                          'Transparent fee structure',
                          'Regular rental income distribution'
                        ].map((reason, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'property-details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Property Type:</span>
                            <span className="font-medium">{property.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Size:</span>
                            <span className="font-medium">{property.details?.squareFeet?.toLocaleString()} sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bedrooms:</span>
                            <span className="font-medium">{property.details?.bedrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bathrooms:</span>
                            <span className="font-medium">{property.details?.bathrooms}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Year Built:</span>
                            <span className="font-medium">{property.details?.yearBuilt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Parking:</span>
                            <span className="font-medium">{property.details?.parking}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-medium capitalize text-green-600">{property.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'financial-info' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Property Value:</span>
                          <span className="font-medium">{formatCurrency(property.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Rent:</span>
                          <span className="font-medium">{formatCurrency(property.monthlyRent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Annual Rent:</span>
                          <span className="font-medium">{formatCurrency(property.monthlyRent * 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gross Yield:</span>
                          <span className="font-medium">{((property.monthlyRent * 12) / property.price * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Management Fee:</span>
                          <span className="font-medium">{property.managementFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Charge:</span>
                          <span className="font-medium">{formatCurrency(property.serviceCharge)}/year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'calculator' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Calculator</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Investment Amount (€)
                          </label>
                          <input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            placeholder="Enter amount"
                            min="3000"
                            max="50000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        
                        {investmentAmount && (
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Annual Return:</span>
                              <span className="font-medium text-green-600">
                                {formatCurrency(calculateReturns(parseFloat(investmentAmount)))}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Monthly Return:</span>
                              <span className="font-medium text-green-600">
                                {formatCurrency(calculateReturns(parseFloat(investmentAmount)) / 12)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          'Modern Kitchen',
                          'Air Conditioning',
                          'Balcony',
                          'Elevator',
                          'Parking Space',
                          'Storage Room',
                          'High-Speed Internet',
                          'Security System'
                        ].map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Investment Overview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Overview</h3>
              
              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Funding Progress</span>
                  <span className="text-sm font-bold text-purple-600">{property.investment?.returnPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${property.investment?.returnPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>€{((property.investment?.returnPercentage * property.price) / 100).toLocaleString()}</span>
                  <span>€{property.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.occupancyRate}%</div>
                  <div className="text-xs text-gray-600">Occupancy</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{property.investment?.annualReturn}</div>
                  <div className="text-xs text-gray-600">Annual Return</div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Investors:</span>
                  <span className="font-medium">{property.investment?.investors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min Investment:</span>
                  <span className="font-medium">€{property.minInvestment?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Investment Term:</span>
                  <span className="font-medium">{property.investmentTerm}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Growth:</span>
                  <span className="font-medium text-green-600">+{property.currentGrowth}%</span>
                </div>
              </div>

              {/* Investment Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (€)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">€</span>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="3000"
                    max="50000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum: €3,000 | Maximum: €50,000</p>
              </div>

              {/* Invest Button */}
              <button
                onClick={handleInvestment}
                disabled={!investmentAmount || parseFloat(investmentAmount) < 3000}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Invest Now
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Secure investment • 1st charge security • Regulated platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Confirm Investment</h3>
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Amount:</span>
                    <span className="font-medium">€{parseFloat(investmentAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Annual Return:</span>
                    <span className="font-medium text-green-600">{property.investment?.annualReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Term:</span>
                    <span className="font-medium">{property.investmentTerm}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowInvestmentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmInvestment}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Confirm Investment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;