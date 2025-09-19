'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';

const PropertySharePage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [propertyShares, setPropertyShares] = useState([]);
  const [filteredShares, setFilteredShares] = useState([]);
  const [selectedShare, setSelectedShare] = useState(null);
  const [buyDetails, setBuyDetails] = useState({
    investmentAmount: '',
    investorName: '',
    investorEmail: '',
    investorPhone: ''
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch property shares on component mount
  useEffect(() => {
    const fetchPropertyShares = async () => {
      try {
        const response = await fetch('/data/property-shares.json');
        const data = await response.json();
        setPropertyShares(data);
        setFilteredShares(data);
      } catch (error) {
        console.error('Error fetching property shares:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyShares();
  }, []);

  // Filter properties based on search term
  useEffect(() => {
    const filtered = propertyShares.filter(share =>
      share.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      share.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      share.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShares(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, propertyShares]);

  const handleShareSelect = (share) => {
    setSelectedShare(share);
  };

  const handleBuyDetailsChange = (field, value) => {
    setBuyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateInvestmentPercentage = () => {
    if (!selectedShare || !buyDetails.investmentAmount) return '';
    const percentage = (parseFloat(buyDetails.investmentAmount) / selectedShare.shareAmount) * 100;
    return percentage.toFixed(2);
  };

  const handleBuyShare = () => {
    if (!selectedShare || !buyDetails.investmentAmount || !buyDetails.investorName || !buyDetails.investorEmail) {
      alert('Please fill in all required fields');
      return;
    }

    if (parseFloat(buyDetails.investmentAmount) < selectedShare.minimumInvestment) {
      alert(`Minimum investment is ${formatCurrency(selectedShare.minimumInvestment)}`);
      return;
    }

    if (parseFloat(buyDetails.investmentAmount) > selectedShare.shareAmount) {
      alert(`Investment amount cannot exceed the available share amount of ${formatCurrency(selectedShare.shareAmount)}`);
      return;
    }

    setShowModal(true);
  };

  const confirmBuy = () => {
    // Here you would typically send the data to your backend
    console.log('Buy confirmed:', {
      shareId: selectedShare.id,
      investmentAmount: buyDetails.investmentAmount,
      investorDetails: buyDetails
    });
    
    alert('Investment successful! You will receive confirmation details via email.');
    setShowModal(false);
    setBuyDetails({
      investmentAmount: '',
      investorName: '',
      investorEmail: '',
      investorPhone: ''
    });
    setSelectedShare(null);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredShares.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShares = filteredShares.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen mx-auto bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading property shares...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-800 text-white py-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Buy Property Shares</h1>
            <p className="text-xl text-violet-100 max-w-3xl mx-auto">
              Invest in property shares from other investors and diversify your real estate portfolio with fractional ownership opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 justify-center">
          
          {/* Property Shares Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Available Property Shares</h2>
                
                {/* Search Bar */}
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Results Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Showing {currentShares.length} of {filteredShares.length} properties
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              {filteredShares.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {searchTerm ? `No properties found for "${searchTerm}"` : 'No property shares available at the moment.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentShares.map((share) => (
                      <div
                        key={share.id}
                        className={`border rounded-lg p-4 transition-all duration-200 ${
                          selectedShare?.id === share.id
                            ? 'border-violet-500 bg-violet-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleShareSelect(share)}
                      >
                        <img
                          src={share.images?.[0] || '/placeholder-property.jpg'}
                          alt={share.title}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">{share.title}</h3>
                        <p className="text-gray-600 text-xs mb-2">{share.location}</p>
                        <div className="space-y-1 mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Share Amount:</span>
                            <span className="text-sm font-bold text-violet-600">
                              {formatCurrency(share.shareAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Share %:</span>
                            <span className="text-xs font-semibold">{share.sharePercentage}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Expected Return:</span>
                            <span className="text-xs font-semibold text-green-600">{share.expectedReturn}%</span>
                          </div>
                        </div>
                        
                        {/* Buy Now Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/property-share/${share.id}`);
                          }}
                          className="w-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold py-2 px-3 rounded-md transition-colors duration-200 cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              currentPage === page
                                ? 'bg-violet-600 text-white'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>


          </div>

          {/* Sidebar */}
          <div className="space-y-6">




            {/* Selected Share Info */}
            {selectedShare && (
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Share</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Property:</span>
                    <span className="font-semibold">{selectedShare.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <span className="font-semibold">{selectedShare.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Share Amount:</span>
                    <span className="font-semibold">{formatCurrency(selectedShare.shareAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Share Percentage:</span>
                    <span className="font-semibold">{selectedShare.sharePercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expected Return:</span>
                    <span className="font-semibold text-green-600">{selectedShare.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Owner:</span>
                    <span className="font-semibold">{selectedShare.ownerName}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buy Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Purchase</h3>
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-sm font-medium text-gray-700">Property:</span>
                <p className="text-sm text-gray-900">{selectedShare?.title}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Investment Amount:</span>
                <p className="text-sm text-gray-900">{formatCurrency(buyDetails.investmentAmount)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Your Ownership:</span>
                <p className="text-sm text-gray-900">{calculateInvestmentPercentage()}%</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmBuy}
                className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertySharePage;