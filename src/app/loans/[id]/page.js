'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

const LoanDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('12');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await fetch('/data/loans.json');
        const loans = await response.json();
        const foundLoan = loans.find(l => l.id.toString() === params.id);
        setLoan(foundLoan);
      } catch (error) {
        console.error('Error fetching loan:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchLoan();
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
    if (!amount || !loan) return { monthly: 0, annual: 0, total: 0, rate: 0 };
    
    const principal = parseFloat(amount);
    const annualReturnRate = loan.annualReturn / 100;
    const period = parseInt(investmentPeriod);
    
    const annual = principal * annualReturnRate;
    const monthly = annual / 12;
    const total = annual * (period / 12);
    
    return {
      monthly,
      annual,
      total,
      rate: loan.annualReturn
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
    // Handle investment logic here
    console.log('Investment confirmed:', {
      loanId: loan.id,
      amount: investmentAmount,
      period: investmentPeriod
    });
    setShowInvestmentModal(false);
    // Redirect to dashboard or show success message
  };

  const returns = calculateReturns(parseFloat(investmentAmount) || 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loan details...</p>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loan Not Found</h1>
          <p className="text-gray-600 mb-6">The loan you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/loans')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Loans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Loans
            </button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{loan.companyName}</h1>
              <p className="text-lg text-gray-600 mb-4">{loan.industry} • {loan.location}</p>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Active Funding</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{loan.investors}</span> investors
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{Math.round((loan.collectedAmount / loan.targetAmount) * 100)}%</span> funded
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Annual Return</div>
              <div className="text-3xl font-bold text-purple-600">{loan.annualReturn}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* How much will I earn if I invest */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How much will I earn if I invest?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        min="100"
                        max="100000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum: €100 | Maximum: €100,000</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (months)
                    </label>
                    <select
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    >
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                    </select>
                  </div>
                  
                  {/* Quick Investment Amounts */}
                  <div className="grid grid-cols-3 gap-2">
                    {[1000, 5000, 10000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setInvestmentAmount(amount.toString())}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                      >
                        €{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Projection</h3>
                  
                  {investmentAmount && parseFloat(investmentAmount) >= 100 ? (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Total Investment</div>
                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(parseFloat(investmentAmount))}</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Monthly Return</div>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(returns.monthly)}</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Total Return ({investmentPeriod} months)</div>
                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(returns.total)}</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Annual Return Rate</div>
                        <div className="text-2xl font-bold text-purple-600">{returns.rate}%</div>
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
                      <p className="text-sm text-gray-400 mt-1">Minimum investment: €100</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About the loan */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the loan</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {loan.description || `${loan.companyName} is seeking funding to expand their ${loan.industry.toLowerCase()} operations. This business loan offers investors an opportunity to support a growing company while earning attractive returns.`}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Business Details</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><span className="font-medium">Industry:</span> {loan.industry}</li>
                      <li><span className="font-medium">Location:</span> {loan.location}</li>
                      <li><span className="font-medium">Founded:</span> {loan.founded || '2018'}</li>
                      <li><span className="font-medium">Employees:</span> {loan.employees || '25-50'}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Loan Purpose</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Business expansion</li>
                      <li>• Equipment purchase</li>
                      <li>• Working capital</li>
                      <li>• Market development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Interest */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interest</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{loan.annualReturn}%</div>
                  <div className="text-sm text-gray-600">Annual Interest Rate</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{(loan.annualReturn / 12).toFixed(2)}%</div>
                  <div className="text-sm text-gray-600">Monthly Interest Rate</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">Monthly</div>
                  <div className="text-sm text-gray-600">Payment Frequency</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Interest Calculation</h4>
                <p className="text-sm text-gray-600">
                  Interest is calculated monthly and paid out to investors on the 1st of each month. 
                  The annual rate of {loan.annualReturn}% is distributed evenly across 12 monthly payments.
                </p>
              </div>
            </div>

            {/* Loan term and repayment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Loan term and repayment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Repayment Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Loan Term:</span>
                      <span className="font-medium">{loan.loanTerm || '24 months'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Payment Frequency:</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">First Payment:</span>
                      <span className="font-medium">{loan.firstPayment || 'Next month'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Final Payment:</span>
                      <span className="font-medium">{loan.finalPayment || 'In 24 months'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Security & Guarantees</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Personal Guarantee</div>
                        <div className="text-sm text-gray-600">Director's personal guarantee</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Business Assets</div>
                        <div className="text-sm text-gray-600">Secured against business assets</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Credit Check</div>
                        <div className="text-sm text-gray-600">Full credit assessment completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Updates */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Updates</h2>
              
              <div className="space-y-4">
                {[
                  {
                    date: '2024-01-15',
                    title: 'Funding Target Reached 75%',
                    description: 'Great progress! We\'ve reached 75% of our funding target with strong investor interest.',
                    type: 'success'
                  },
                  {
                    date: '2024-01-10',
                    title: 'Q4 Financial Results Published',
                    description: 'Strong Q4 performance with 15% revenue growth compared to previous quarter.',
                    type: 'info'
                  },
                  {
                    date: '2024-01-05',
                    title: 'New Partnership Announced',
                    description: 'Strategic partnership with major supplier to reduce costs and improve margins.',
                    type: 'info'
                  }
                ].map((update, index) => (
                  <div key={index} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      update.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{update.title}</h4>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{update.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reports */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Business Plan',
                    description: 'Comprehensive business plan and strategy document',
                    size: '2.4 MB',
                    type: 'PDF'
                  },
                  {
                    title: 'Financial Statements',
                    description: 'Latest audited financial statements and accounts',
                    size: '1.8 MB',
                    type: 'PDF'
                  },
                  {
                    title: 'Credit Report',
                    description: 'Independent credit assessment and risk analysis',
                    size: '856 KB',
                    type: 'PDF'
                  },
                  {
                    title: 'Market Analysis',
                    description: 'Industry analysis and market opportunity report',
                    size: '3.2 MB',
                    type: 'PDF'
                  }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{report.title}</h4>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <p className="text-xs text-gray-500">{report.type} • {report.size}</p>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Business Address</h4>
                  <div className="text-gray-600 space-y-1">
                    <p>{loan.companyName}</p>
                    <p>{loan.address || '123 Business Street'}</p>
                    <p>{loan.location}</p>
                    <p>{loan.postalCode || 'SW1A 1AA'}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Phone: {loan.phone || '+44 20 1234 5678'}</p>
                      <p>Email: {loan.email || 'info@company.com'}</p>
                      <p>Website: {loan.website || 'www.company.com'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p>Map View</p>
                      <p className="text-sm">{loan.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Investment Overview */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Available for funding card */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Available for funding</h3>
                
                {/* Funding Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Target Amount</span>
                    <span className="text-sm font-medium">{formatCurrency(loan.targetAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">Raised So Far</span>
                    <span className="text-sm font-medium text-green-600">{formatCurrency(loan.collectedAmount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{width: `${Math.min((loan.collectedAmount / loan.targetAmount) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.round((loan.collectedAmount / loan.targetAmount) * 100)}%
                    </span>
                    <span className="text-sm text-gray-600 ml-1">funded</span>
                  </div>
                </div>

                {/* Investment Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{loan.investors}</div>
                    <div className="text-xs text-gray-600">Investors</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{loan.annualReturn}%</div>
                    <div className="text-xs text-gray-600">Annual Return</div>
                  </div>
                </div>

                {/* Investment Overview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Investment Overview</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Investment:</span>
                      <span className="font-medium">€100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum Investment:</span>
                      <span className="font-medium">€100,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Term:</span>
                      <span className="font-medium">{loan.loanTerm || '24 months'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Frequency:</span>
                      <span className="font-medium">Monthly</span>
                    </div>
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
                      min="100"
                      max="100000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Min: €100 | Max: €100,000</p>
                  
                  {/* Investment Preview */}
                  {investmentAmount && parseFloat(investmentAmount) >= 100 && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Expected Monthly Return</div>
                      <div className="text-lg font-bold text-green-600">{formatCurrency(returns.monthly)}</div>
                    </div>
                  )}
                </div>

                {/* Invest Button */}
                <button
                  onClick={handleInvestment}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 mb-4"
                >
                  Invest Now
                </button>
                
                {/* Share via Social */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Share via Social</h4>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                      Facebook
                    </button>
                    <button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                      Twitter
                    </button>
                    <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                      LinkedIn
                    </button>
                  </div>
                </div>
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
                  <span className="text-gray-600">Loan:</span>
                  <span className="font-medium">{loan.companyName}</span>
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
                  <span className="text-gray-600">Annual Return Rate:</span>
                  <span className="font-medium text-purple-600">{returns.rate}%</span>
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

export default LoanDetailsPage;