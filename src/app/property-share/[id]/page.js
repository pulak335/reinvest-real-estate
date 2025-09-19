'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/formatters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PropertyShareDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [propertyShare, setPropertyShare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [investorName, setInvestorName] = useState('');

  useEffect(() => {
    const fetchPropertyShare = async () => {
      try {
        const response = await fetch('/data/property-shares.json');
        const data = await response.json();
        const share = data.find(item => item.id === parseInt(params.id));
        
        if (share) {
          setPropertyShare(share);
          setInvestmentAmount(share.minimumInvestment.toString());
        }
      } catch (error) {
        console.error('Error fetching property share:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPropertyShare();
    }
  }, [params.id]);

  const handleBuyShare = () => {
    setShowConfirmModal(true);
  };

  const confirmBuy = () => {
    // Here you would typically make an API call to process the purchase
    alert(`Purchase confirmed for ${investorName}! Investment: ${formatCurrency(parseInt(investmentAmount))}`);
    setShowConfirmModal(false);
    router.push('/property-share');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property share details...</p>
        </div>
      </div>
    );
  }

  if (!propertyShare) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Share Not Found</h1>
          <p className="text-gray-600 mb-6">The property share you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/property-share')}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Back to Property Shares
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/property-share')}
            className="mb-6 flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Property Shares
          </button>
          <h1 className="text-4xl font-bold mb-4">{propertyShare.title}</h1>
          <p className="text-xl opacity-90">{propertyShare.location}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Property Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img
                src={propertyShare.images?.[0] || '/placeholder-property.jpg'}
                alt={propertyShare.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Property Information with Tabs */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Information</h2>
              
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-violet-500 text-violet-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'details'
                        ? 'border-violet-500 text-violet-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Property Details
                  </button>
                  <button
                    onClick={() => setActiveTab('location')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'location'
                        ? 'border-violet-500 text-violet-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Location & Amenities
                  </button>
                  <button
                    onClick={() => setActiveTab('financials')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'financials'
                        ? 'border-violet-500 text-violet-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Financial Details
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg leading-relaxed">{propertyShare.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Investment Highlights</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Prime location with high growth potential</li>
                        <li>• Professional property management</li>
                        <li>• Diversified investment opportunity</li>
                        <li>• Regular rental income distribution</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected Return:</span>
                          <span className="font-semibold text-green-600">{propertyShare.expectedReturn}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Share Percentage:</span>
                          <span className="font-semibold">{propertyShare.sharePercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Min Investment:</span>
                          <span className="font-semibold">{formatCurrency(propertyShare.minimumInvestment)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Property Specifications</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Property Type:</span>
                          <span className="font-semibold">Residential Apartment</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Total Area:</span>
                          <span className="font-semibold">1,250 sq ft</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Bedrooms:</span>
                          <span className="font-semibold">3</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Bathrooms:</span>
                          <span className="font-semibold">2</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Year Built:</span>
                          <span className="font-semibold">2019</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Parking:</span>
                          <span className="font-semibold">1 Covered Space</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Building Features</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Building Type:</span>
                          <span className="font-semibold">Modern Complex</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Total Units:</span>
                          <span className="font-semibold">48</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Floors:</span>
                          <span className="font-semibold">6</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Elevator:</span>
                          <span className="font-semibold">Yes</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Security:</span>
                          <span className="font-semibold">24/7 Concierge</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Pet Policy:</span>
                          <span className="font-semibold">Pet Friendly</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Location Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Full Address:</span>
                          <span className="font-semibold">123 Main Street, {propertyShare.location}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Neighborhood:</span>
                          <span className="font-semibold">Downtown District</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Walk Score:</span>
                          <span className="font-semibold text-green-600">92/100 (Walker's Paradise)</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Transit Score:</span>
                          <span className="font-semibold text-blue-600">85/100 (Excellent Transit)</span>
                        </div>
                      </div>

                      <h4 className="font-semibold text-gray-900 text-lg mt-6">Nearby Transportation</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-600">Metro Station - 0.3 miles</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-gray-600">Bus Stop - 0.1 miles</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          <span className="text-gray-600">Highway Access - 1.2 miles</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Nearby Amenities</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Shopping & Dining</h5>
                          <ul className="space-y-1 text-gray-600">
                            <li>• Whole Foods Market - 0.4 miles</li>
                            <li>• Downtown Shopping Center - 0.6 miles</li>
                            <li>• Various Restaurants - 0.2 miles</li>
                            <li>• Coffee Shops - 0.1 miles</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Healthcare & Education</h5>
                          <ul className="space-y-1 text-gray-600">
                            <li>• City General Hospital - 1.5 miles</li>
                            <li>• Elementary School - 0.8 miles</li>
                            <li>• Public Library - 0.5 miles</li>
                            <li>• Fitness Centers - 0.3 miles</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Recreation</h5>
                          <ul className="space-y-1 text-gray-600">
                            <li>• Central Park - 0.7 miles</li>
                            <li>• Movie Theater - 0.9 miles</li>
                            <li>• Sports Complex - 1.1 miles</li>
                            <li>• Marina - 2.3 miles</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Investment Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Total Property Value:</span>
                          <span className="font-semibold">{formatCurrency(propertyShare.totalValue)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Share Amount:</span>
                          <span className="font-semibold">{formatCurrency(propertyShare.shareAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Share Percentage:</span>
                          <span className="font-semibold">{propertyShare.sharePercentage}%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Minimum Investment:</span>
                          <span className="font-semibold">{formatCurrency(propertyShare.minimumInvestment)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Expected Annual Return:</span>
                          <span className="font-semibold text-green-600">{propertyShare.expectedReturn}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Financial Projections</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Monthly Rental Income:</span>
                          <span className="font-semibold">{formatCurrency(2850)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Annual Rental Income:</span>
                          <span className="font-semibold">{formatCurrency(34200)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Property Management Fee:</span>
                          <span className="font-semibold">8%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Estimated Appreciation:</span>
                          <span className="font-semibold text-blue-600">4.5% annually</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Occupancy Rate:</span>
                          <span className="font-semibold">95%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 text-lg mb-4">Investment Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-violet-600">{propertyShare.expectedReturn}%</div>
                        <div className="text-sm text-gray-600">Expected Annual Return</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(propertyShare.shareAmount * 0.08)}</div>
                        <div className="text-sm text-gray-600">Estimated Annual Income</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">5 years</div>
                        <div className="text-sm text-gray-600">Recommended Hold Period</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Investment Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Share Amount:</span>
                  <span className="text-2xl font-bold text-violet-600">
                    {formatCurrency(propertyShare.shareAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Share Percentage:</span>
                  <span className="font-semibold">{propertyShare.sharePercentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expected Annual Return:</span>
                  <span className="font-semibold text-green-600">{propertyShare.expectedReturn}%</span>
                </div>
              </div>

              <button
                onClick={handleBuyShare}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 mb-4"
              >
                Buy This Share
              </button>

              <div className="text-sm text-gray-500 space-y-2">
                <p>• Minimum investment: {formatCurrency(propertyShare.minimumInvestment)}</p>
                <p>• Investment period: {propertyShare.investmentPeriod}</p>
                <p>• Expected returns are projections and not guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Purchase</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Amount
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min={propertyShare.minimumInvestment}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investor Name
                </label>
                <input
                  type="text"
                  value={investorName}
                  onChange={(e) => setInvestorName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBuy}
                disabled={!investorName || !investmentAmount}
                className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
}