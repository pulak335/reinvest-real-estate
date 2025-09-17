'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

const PropertyDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('3');
  const [returnType, setReturnType] = useState('monthly');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('/data/properties.json');
        const properties = await response.json();
        const foundProperty = properties.find(p => p.id.toString() === params.id);
        setProperty(foundProperty);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateReturns = (amount) => {
    if (!amount || !property) return { monthly: 0, annual: 0, total: 0, rate: 0, finalAmount: 0, profit: 0 };
    
    const period = parseInt(investmentPeriod);
    let annualReturnRate;
    
    // Determine return rate based on investment period
    if (period === 1) annualReturnRate = 0.07;
    else if (period === 2) annualReturnRate = 0.075;
    else if (period === 3) annualReturnRate = 0.08;
    else if (period === 5) annualReturnRate = 0.085;
    else annualReturnRate = 0.09;
    
    const principal = parseFloat(amount);
    const annual = principal * annualReturnRate;
    const monthly = annual / 12;
    
    let finalAmount, totalReturn;
    
    if (returnType === 'compound') {
      // Compound interest calculation
      finalAmount = principal * Math.pow(1 + annualReturnRate, period);
      totalReturn = finalAmount - principal;
    } else {
      // Simple interest for monthly returns
      totalReturn = annual * period;
      finalAmount = principal + totalReturn;
    }
    
    return {
      monthly,
      annual,
      total: totalReturn,
      rate: (annualReturnRate * 100).toFixed(1),
      finalAmount,
      profit: totalReturn
    };
  };

  const handleInvestment = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowInvestmentModal(true);
  };

  const confirmInvestment = () => {
    // Here you would typically make an API call to process the investment
    alert(`Investment of ${formatCurrency(investmentAmount)} confirmed!`);
    setShowInvestmentModal(false);
    setInvestmentAmount('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
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
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/properties')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const returns = calculateReturns(parseFloat(investmentAmount) || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Property Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-purple-600 hover:text-purple-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Properties
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.address ? 
              `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}` : 
              property.location
            }
          </div>
        </div>
      </div>

      {/* Hero Section with Property Overview */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Aerial View Image */}
          <div className="relative overflow-hidden">
            <img 
              src={property.images?.[0] || '/api/placeholder/800/600'} 
              alt={`Aerial view of ${property.title}`}
              className="w-full h-full object-cover"
            />
            {/* Property Location Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side - Investment Information */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 lg:p-12 flex flex-col justify-center">
            {/* Investment Status Badge */}
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6 w-fit">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Left to Invest
            </div>

            {/* Main Investment Stats */}
            <div className="mb-8">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {formatCurrency(property.investment?.totalInvestment || 1150000)}
              </div>
              <div className="text-purple-200 text-lg">
                Available for funding: {formatCurrency(property.investment?.availableFunding || 314914)}
              </div>
            </div>

            {/* Investor Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-2xl font-bold">{property.investment?.investors || 159}</div>
                <div className="text-purple-200 text-sm">Investors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(property.investment?.totalInvestment || 1150000).replace('$', '$')}</div>
                <div className="text-purple-200 text-sm">Total Investment</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(property.investment?.goalAmount || 3000000)}</div>
                <div className="text-purple-200 text-sm">Goal</div>
              </div>
            </div>

            {/* Occupancy Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Occupancy</h3>
              <div className="space-y-3">
                {/* Occupancy Progress Bar */}
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>0%</span>
                  <span>20%</span>
                  <span>40%</span>
                  <span>60%</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{width: `${property.investment?.occupancyRate || 75}%`}}></div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{property.investment?.occupancyRate || 75}%</span>
                </div>
              </div>
            </div>

            {/* Annual Return Rate */}
            <div className="mb-8">
              <div className="text-sm text-purple-200 mb-1">Annual return rate:</div>
              <div className="text-3xl font-bold">{property.investment?.annualReturn || '7.00%'}</div>
            </div>

            {/* Invest Button */}
            <button
              onClick={handleInvestment}
              className="bg-white text-purple-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
            >
              Invest
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Description</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The "Reinvent" team is introducing a new buy-to-let investment opportunity, A19, Vilnius. 
                  This is the most recent offer consists of well-functioning premises, which are currently 
                  being converted into studio apartments/lofts. In this way, the aim is to increase the 
                  rental income of this real estate project.
                </p>
              </div>

              {/* Reasons to Invest */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Reasons to invest in the project A19, Vilnius:</h3>
                <div className="space-y-3">
                  {[
                    'High rental yield potential in a prime location',
                    'Well-structured rental lease structure',
                    'The track manages a balanced portfolio',
                    'The track manages a balanced portfolio',
                    'Excellent capital gains',
                    'Potential for capital appreciation due to the convenient nature of the location',
                    'The project owner is an experienced real estate administrator'
                  ].map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Terms */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Financial terms of the investment:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">36 Months</div>
                    <div className="text-gray-600">Investment term</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">1st charge</div>
                    <div className="text-gray-600">Security</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Annual Return</div>
                    <div className="text-gray-600">7%</div>
                  </div>
                </div>
              </div>

              {/* When Investing */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">When investing:</h3>
                <div className="space-y-3">
                  {[
                    'Years 1 – 3000 €+ - the annual return is 7%',
                    'Years 4 – 10000 €+ - the annual return is 7.5%',
                    'Years 5 – 20000 €+ - the annual return is 8%',
                    'Years 6 – 40000 €+ - the annual return is 8.5%',
                    'Years 7 and more - the annual return is 9%'
                  ].map((term, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{term}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capital Growth Distribution */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">The capital growth distribution:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">40%</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">40% - 80%</div>
                    <div className="text-gray-600">Investors</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">40%</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">40%</div>
                    <div className="text-gray-600">Reinvest</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Up to 20%</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">Up to 20%</div>
                    <div className="text-gray-600">Management</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Information</h2>
              
              <div className="">
                {/* Property Details */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Property Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium">{property.type || 'Apartment'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Value:</span>
                      <span className="font-medium">{formatCurrency(property.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{property.details?.squareFeet?.toLocaleString() || '1,200'} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year Built:</span>
                      <span className="font-medium">{property.details?.yearBuilt || '2020'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="font-medium">{property.details?.bedrooms || '2'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="font-medium">{property.details?.bathrooms || '2'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parking:</span>
                      <span className="font-medium">{property.details?.parking || '1 Space'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize text-green-600">{property.status}</span>
                    </div>
                  </div>
                </div>
                <div className='bg-black h-1 w-full my-5'></div>
                {/* Financial Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Financial Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rent:</span>
                      <span className="font-medium text-green-600">€{property.monthlyRent?.toLocaleString() || '2,500'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rental Yield:</span>
                      <span className="font-medium text-green-600">{property.rentalYield || '7.2'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Return:</span>
                      <span className="font-medium text-purple-600">{property.investment?.annualReturn || '8.5%'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cap Rate:</span>
                      <span className="font-medium">{property.capRate || '6.8'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax:</span>
                      <span className="font-medium">€{property.propertyTax?.toLocaleString() || '3,200'}/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Management Fee:</span>
                      <span className="font-medium">{property.managementFee || '8'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maintenance Cost:</span>
                      <span className="font-medium">€{property.maintenanceCost?.toLocaleString() || '1,800'}/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-medium">€{property.insurance?.toLocaleString() || '1,200'}/year</span>
                    </div>
                  </div>
                </div>
                <div className='bg-black h-1 w-full my-5'></div>
                {/* Investment Overview */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Investment Overview</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investors:</span>
                      <span className="font-medium">{property.investment?.investors || '127'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment:</span>
                      <span className="font-medium">{formatCurrency(property.investment?.totalInvestment || 450000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Funding Progress:</span>
                      <span className="font-medium text-purple-600">{property.investment?.returnPercentage?.toFixed(1) || '65.0'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Investment:</span>
                      <span className="font-medium">€{property.minInvestment?.toLocaleString() || '3,000'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Investment:</span>
                      <span className="font-medium">€{property.maxInvestment?.toLocaleString() || '50,000'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Term:</span>
                      <span className="font-medium">{property.investmentTerm || '36 months'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Occupancy Rate:</span>
                      <span className="font-medium text-green-600">{property.occupancyRate || '95'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Manager:</span>
                      <span className="font-medium">{property.propertyManager || 'Reinvent Group'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Calculator */}
            <div className="bg-white rounded-lg shadow-sm p-6 w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Calculator</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
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
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum: €3,000 | Maximum: €50,000</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period
                    </label>
                    <select
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    >
                      <option value="1">1 Year (7.0% return)</option>
                      <option value="2">2 Years (7.5% return)</option>
                      <option value="3">3 Years (8.0% return)</option>
                      <option value="5">5 Years (8.5% return)</option>
                      <option value="10">10 Years (9.0% return)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setReturnType('monthly')}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          returnType === 'monthly'
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        Monthly Returns
                      </button>
                      <button
                        onClick={() => setReturnType('compound')}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          returnType === 'compound'
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        Compound Interest
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Projection</h3>
                  
                  {investmentAmount && parseFloat(investmentAmount) >= 3000 ? (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Total Investment</div>
                        <div className="text-2xl font-bold text-gray-900">€{parseFloat(investmentAmount).toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">
                          {returnType === 'monthly' ? 'Monthly Return' : 'Total Return'}
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          €{returnType === 'monthly' 
                            ? returns.monthly.toLocaleString()
                            : returns.total.toLocaleString()
                          }
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Annual Return Rate</div>
                        <div className="text-2xl font-bold text-purple-600">{returns.rate}%</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Final Amount</div>
                        <div className="text-2xl font-bold text-blue-600">€{returns.finalAmount.toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Profit</div>
                        <div className="text-2xl font-bold text-green-600">€{returns.profit.toLocaleString()}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500">Enter an investment amount to see projections</p>
                      <p className="text-sm text-gray-400 mt-1">Minimum investment: €3,000</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Investment Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Overview</h2>
              
              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Available for funding</span>
                  <span className="text-sm font-medium text-purple-600">€25,000</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Minimum funding</span>
                  <span className="text-sm font-medium">€3,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>

              {/* Occupancy Stats */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Occupancy</h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">9%</div>
                    <div className="text-xs text-gray-500">Q1</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">34%</div>
                    <div className="text-xs text-gray-500">Q2</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">46%</div>
                    <div className="text-xs text-gray-500">Q3</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">56%</div>
                    <div className="text-xs text-gray-500">Q4</div>
                  </div>
                </div>
              </div>

              {/* Annual Return Rate */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Annual return rate</h4>
                <div className="text-2xl font-bold text-gray-900 mb-1">7.5%</div>
                <div className="text-sm text-gray-600">Expected annual return</div>
              </div>

              {/* Investment Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shares</span>
                  <span className="font-medium">€25.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium">€25.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sum</span>
                  <span className="font-medium">€25.00</span>
                </div>
              </div>

              {/* Current Growth Rate */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current growth rate</span>
                  <span className="text-lg font-bold text-green-600">+42% ↗</span>
                </div>
              </div>

              {/* Investment Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
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
                <p className="text-xs text-gray-500 mt-1">Min: €3,000 | Max: €50,000</p>
                
                {/* Quick Investment Amounts */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[5000, 10000, 25000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setInvestmentAmount(amount.toString())}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      €{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                
                {/* Investment Preview */}
                {investmentAmount && parseFloat(investmentAmount) >= 3000 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Expected Monthly Return</div>
                    <div className="text-lg font-bold text-green-600">{formatCurrency(returns.monthly)}</div>
                  </div>
                )}
              </div>

              {/* Invest Button */}
              <button
                onClick={handleInvestment}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Invest Now
              </button>
              
              <div className="text-center mt-3">
                <a href="#" className="text-sm text-purple-600 hover:underline">Request a free callback</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Investment</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium">{property.title}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Investment Amount:</span>
                  <span className="font-medium">{formatCurrency(investmentAmount)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Expected Monthly Return:</span>
                  <span className="font-medium text-green-600">{formatCurrency(returns.monthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Annual Return:</span>
                  <span className="font-medium text-green-600">{formatCurrency(returns.annual)}</span>
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
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
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