'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalReturn: 0,
    returnPercentage: 0,
    activeInvestments: 0,
    monthlyIncome: 0,
    recentTransactions: [],
    portfolioBreakdown: [],
    performanceData: []
  });
  const [timeframe, setTimeframe] = useState('1Y');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [accountBalance, setAccountBalance] = useState(125000);
  const [availableBalance, setAvailableBalance] = useState(98500);
  const [investedAmount, setInvestedAmount] = useState(26500);
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [withdrawTo, setWithdrawTo] = useState('Primary Bank Account');
  const [riskTolerance, setRiskTolerance] = useState('Moderate');
  const [investmentFocus, setInvestmentFocus] = useState('Mixed Portfolio');
  const [portfolioData, setPortfolioData] = useState({
    investments: [],
    properties: [],
    totalInvested: 0,
    currentValue: 0,
    totalReturn: 0,
    monthlyIncome: 0
  });



  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data based on user type
      const mockData = {
        totalInvestment: user?.type === 'investor' ? 250000 : user?.type === 'individual' ? 75000 : 150000,
        currentValue: user?.type === 'investor' ? 287500 : user?.type === 'individual' ? 82250 : 168750,
        totalReturn: user?.type === 'investor' ? 37500 : user?.type === 'individual' ? 7250 : 18750,
        returnPercentage: user?.type === 'investor' ? 15.0 : user?.type === 'individual' ? 9.67 : 12.5,
        activeInvestments: user?.type === 'investor' ? 8 : user?.type === 'individual' ? 3 : 5,
        monthlyIncome: user?.type === 'investor' ? 3200 : user?.type === 'individual' ? 850 : 1800,
        recentTransactions: [
          { id: 1, type: 'investment', property: 'Sunset Villa Complex', amount: 25000, date: '2024-01-15', status: 'completed' },
          { id: 2, type: 'dividend', property: 'Downtown Office Plaza', amount: 1200, date: '2024-01-10', status: 'completed' },
          { id: 3, type: 'investment', property: 'Riverside Apartments', amount: 15000, date: '2024-01-05', status: 'pending' },
          { id: 4, type: 'dividend', property: 'Metro Shopping Center', amount: 800, date: '2024-01-01', status: 'completed' }
        ],
        portfolioBreakdown: [
          { type: 'Residential', value: 120000, percentage: 42 },
          { type: 'Commercial', value: 95000, percentage: 33 },
          { type: 'Mixed-Use', value: 72500, percentage: 25 }
        ],
        performanceData: [
          { month: 'Jan', value: 245000 },
          { month: 'Feb', value: 252000 },
          { month: 'Mar', value: 248000 },
          { month: 'Apr', value: 265000 },
          { month: 'May', value: 271000 },
          { month: 'Jun', value: 287500 }
        ]
      };
      
      setDashboardData(mockData);
      
      // Load portfolio data for investor users
      if (user?.type === 'investor') {
        await loadPortfolioData();
      }
      
      setIsLoading(false);
    };

    const loadPortfolioData = async () => {
      try {
        // Fetch user data
        const usersResponse = await fetch('/data/users.json');
        const usersData = await usersResponse.json();
        
        // Fetch properties data
        const propertiesResponse = await fetch('/data/properties.json');
        const propertiesData = await propertiesResponse.json();
        
        // Find current user's investment data
        const currentUser = usersData.users.find(u => u.email === user?.email);
        
        if (currentUser && currentUser.investments) {
          // Map investments with property details
          const investmentsWithDetails = currentUser.investments.map(investment => {
            const property = propertiesData.find(p => p.id.toString() === investment.propertyId.replace('PROP', '').padStart(3, '0'));
            return {
              ...investment,
              property: property || { title: 'Property Not Found', location: 'Unknown' }
            };
          });
          
          // Calculate portfolio metrics
          const totalInvested = currentUser.investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
          const currentValue = currentUser.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
          const totalReturn = currentValue - totalInvested;
          const monthlyIncome = currentUser.investments.reduce((sum, inv) => sum + inv.monthlyReturn, 0);
          
          setPortfolioData({
            investments: investmentsWithDetails,
            properties: propertiesData,
            totalInvested,
            currentValue,
            totalReturn,
            monthlyIncome
          });
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);



  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div>
    <Navbar />
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-600 mt-2">Here's your investment overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="1M">1 Month</option>
                <option value="3M">3 Months</option>
                <option value="6M">6 Months</option>
                <option value="1Y">1 Year</option>
                <option value="ALL">All Time</option>
              </select>
              <Link
                href="/properties"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>

        {/* Features Tab Menu */}
        <div className="mb-8 sticky top-20 bg-white z-100">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
              {user?.type === 'investor' && (
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'portfolio'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Portfolio
                </button>
              )}
              <button
                onClick={() => setActiveTab('calculator')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calculator'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'insights'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Market Insights
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tools'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tools
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'account'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Account
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardData.totalInvestment)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardData.currentValue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Return</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(dashboardData.totalReturn)}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {formatPercentage(dashboardData.returnPercentage)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardData.monthlyIncome)}
                </p>
                <p className="text-sm text-gray-600">
                  {dashboardData.activeInvestments} active investments
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Portfolio Performance</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                  <span>Portfolio Value</span>
                </div>
              </div>
              
              {/* Simple Chart Representation */}
              <div className="h-64 flex items-end space-x-4">
                {dashboardData.performanceData.map((data, index) => {
                  const height = (data.value / Math.max(...dashboardData.performanceData.map(d => d.value))) * 200;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex items-end justify-center mb-2">
                        <div
                          className="bg-purple-600 rounded-t-sm transition-all duration-500 ease-in-out"
                          style={{ height: `${height}px`, width: '80%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Portfolio Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Breakdown</h2>
            <div className="space-y-4">
              {dashboardData.portfolioBreakdown.map((item, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${colors[index]}`}></div>
                      <span className="text-sm font-medium text-gray-900">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(item.value)}
                      </p>
                      <p className="text-xs text-gray-600">{item.percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Simple Donut Chart Representation */}
            <div className="mt-6 flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {dashboardData.portfolioBreakdown.map((item, index) => {
                    const colors = ['text-blue-500', 'text-green-500', 'text-purple-500'];
                    const offset = dashboardData.portfolioBreakdown.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                    return (
                      <path
                        key={index}
                        className={colors[index]}
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={`${item.percentage}, 100`}
                        strokeDashoffset={-offset}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Total</p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatCurrency(dashboardData.currentValue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <Link
                  href="/transactions"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === 'investment' ? 'bg-blue-100' : 'bg-green-100'
                          }`}>
                            {transaction.type === 'investment' ? (
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {transaction.type}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{transaction.property}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className={`text-sm font-medium ${
                          transaction.type === 'investment' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'investment' ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/properties"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Browse Properties</p>
                  <p className="text-sm text-gray-600">Find new investment opportunities</p>
                </div>
              </Link>

              <Link
                href="/profile"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Update Profile</p>
                  <p className="text-sm text-gray-600">Manage your account information</p>
                </div>
              </Link>

              <Link
                href="/help-center"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Get Help</p>
                  <p className="text-sm text-gray-600">Access support and resources</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance Over Time</h3>
              <div className="h-80 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                      <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">1Y</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">6M</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">3M</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">1M</button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="text-xl font-bold text-green-600">$125,000</p>
                      <p className="text-sm text-green-600">+15.2% (+$16,250)</p>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05"/>
                        </linearGradient>
                      </defs>
                      <path d="M 20 160 Q 80 140 120 120 T 200 100 T 280 80 T 360 60" stroke="#8B5CF6" strokeWidth="3" fill="none"/>
                      <path d="M 20 160 Q 80 140 120 120 T 200 100 T 280 80 T 360 60 L 360 180 L 20 180 Z" fill="url(#gradient)"/>
                      <circle cx="360" cy="60" r="4" fill="#8B5CF6"/>
                    </svg>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-500">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                      <span>Sep</span>
                      <span>Nov</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">ROI Analysis</h4>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">12.5%</p>
                <p className="text-sm text-gray-600">Annual Return</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-green-600">+2.3%</span>
                  <span className="text-gray-500 ml-1">vs last quarter</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Risk Score</h4>
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-yellow-600">6.2/10</p>
                <p className="text-sm text-gray-600">Moderate Risk</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '62%'}}></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Diversification</h4>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">85%</p>
                <p className="text-sm text-gray-600">Well Diversified</p>
                <div className="mt-2 flex space-x-1">
                  <div className="flex-1 h-2 bg-blue-600 rounded"></div>
                  <div className="flex-1 h-2 bg-blue-400 rounded"></div>
                  <div className="flex-1 h-2 bg-blue-300 rounded"></div>
                  <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Sharpe Ratio</h4>
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-purple-600">1.85</p>
                <p className="text-sm text-gray-600">Risk-Adjusted Return</p>
                <div className="mt-2 text-sm text-purple-600">Excellent</div>
              </div>
            </div>

            {/* Asset Allocation & Performance Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                      <span className="text-gray-700">Residential Properties</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">45%</span>
                      <div className="text-sm text-gray-500">$56,250</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="text-gray-700">Commercial REITs</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">30%</span>
                      <div className="text-sm text-gray-500">$37,500</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="text-gray-700">Industrial Properties</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">15%</span>
                      <div className="text-sm text-gray-500">$18,750</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                      <span className="text-gray-700">Cash & Equivalents</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">10%</span>
                      <div className="text-sm text-gray-500">$12,500</div>
                    </div>
                  </div>
                  <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden flex">
                    <div className="bg-purple-600" style={{width: '45%'}}></div>
                    <div className="bg-blue-600" style={{width: '30%'}}></div>
                    <div className="bg-green-600" style={{width: '15%'}}></div>
                    <div className="bg-yellow-600" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Asset Class</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Residential Properties</div>
                      <div className="text-sm text-gray-600">YTD Performance</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-semibold">+18.5%</div>
                      <div className="text-sm text-gray-500">$10,395</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Commercial REITs</div>
                      <div className="text-sm text-gray-600">YTD Performance</div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 font-semibold">+12.3%</div>
                      <div className="text-sm text-gray-500">$4,613</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Industrial Properties</div>
                      <div className="text-sm text-gray-600">YTD Performance</div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-600 font-semibold">+8.7%</div>
                      <div className="text-sm text-gray-500">$1,631</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Cash & Equivalents</div>
                      <div className="text-sm text-gray-600">YTD Performance</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600 font-semibold">+2.1%</div>
                      <div className="text-sm text-gray-500">$263</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Insights & Recommendations */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Investment Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="font-medium text-green-800">Opportunity</span>
                  </div>
                  <p className="text-sm text-green-700">Consider increasing allocation to industrial REITs. Market trends show 15% growth potential in logistics properties.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="font-medium text-yellow-800">Rebalance</span>
                  </div>
                  <p className="text-sm text-yellow-700">Your portfolio is slightly overweight in residential properties. Consider diversifying into commercial sectors.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-blue-800">Performance</span>
                  </div>
                  <p className="text-sm text-blue-700">Your portfolio is outperforming the market by 3.2%. Maintain current strategy with minor adjustments.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Investment Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment</label>
                    <input
                      type="number"
                      placeholder="50000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution</label>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      placeholder="8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                    <input
                      type="number"
                      placeholder="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium">
                    Calculate Returns
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Projected Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment:</span>
                      <span className="font-medium">$170,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Returns:</span>
                      <span className="font-medium text-green-600">$85,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="text-gray-900 font-medium">Final Value:</span>
                      <span className="font-bold text-lg">$255,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Market Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Residential Properties</div>
                      <div className="text-sm text-gray-600">Average price increase</div>
                    </div>
                    <div className="text-green-600 font-bold">+5.2%</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Commercial Real Estate</div>
                      <div className="text-sm text-gray-600">Rental yield average</div>
                    </div>
                    <div className="text-blue-600 font-bold">7.8%</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Mixed-Use Developments</div>
                      <div className="text-sm text-gray-600">Market demand</div>
                    </div>
                    <div className="text-purple-600 font-bold">High</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Opportunities</h2>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="font-medium text-gray-900">Emerging Markets</div>
                    <div className="text-sm text-gray-600">High growth potential in suburban areas</div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="font-medium text-gray-900">Tech Hubs</div>
                    <div className="text-sm text-gray-600">Strong rental demand near technology centers</div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="font-medium text-gray-900">Green Buildings</div>
                    <div className="text-sm text-gray-600">Sustainable properties showing premium returns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio Analyzer</h3>
                <p className="text-gray-600 text-sm mb-4">Analyze your portfolio performance and get personalized recommendations</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Launch Tool
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tax Calculator</h3>
                <p className="text-gray-600 text-sm mb-4">Calculate tax implications of your real estate investments</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Launch Tool
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Property Finder</h3>
                <p className="text-gray-600 text-sm mb-4">Advanced search tool to find properties matching your criteria</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Launch Tool
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Risk Assessment</h3>
                <p className="text-gray-600 text-sm mb-4">Evaluate investment risks and get mitigation strategies</p>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Launch Tool
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Due Diligence</h3>
                <p className="text-gray-600 text-sm mb-4">Comprehensive checklist for property evaluation</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Launch Tool
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Document Vault</h3>
                <p className="text-gray-600 text-sm mb-4">Secure storage for all your investment documents</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Launch Tool
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="space-y-8">
            {/* Account Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Balance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Balance:</span>
                    <span className="font-semibold text-2xl text-green-600">${accountBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-medium text-blue-600">${availableBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invested:</span>
                    <span className="font-medium text-purple-600">${investedAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 block">Account Number:</span>
                    <span className="font-medium">****-****-1234</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Account Type:</span>
                    <span className="font-medium">Investment Account</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Member Since:</span>
                    <span className="font-medium">January 2023</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    View Statements
                  </button>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Tax Documents
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Account Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Deposit and Withdraw Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Funds</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Wire Transfer">Wire Transfer</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => {
                      if (depositAmount) {
                        setAccountBalance(prev => prev + parseFloat(depositAmount));
                        setAvailableBalance(prev => prev + parseFloat(depositAmount));
                        setDepositAmount('');
                        alert(`Successfully deposited $${parseFloat(depositAmount).toLocaleString()}`);
                      }
                    }}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Deposit Funds
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdraw Funds</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      max={availableBalance}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Available: ${availableBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Withdraw To</label>
                    <select 
                      value={withdrawTo}
                      onChange={(e) => setWithdrawTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Primary Bank Account">Primary Bank Account</option>
                      <option value="Secondary Bank Account">Secondary Bank Account</option>
                      <option value="Wire Transfer">Wire Transfer</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => {
                      const amount = parseFloat(withdrawAmount);
                      if (amount && amount <= availableBalance) {
                        setAccountBalance(prev => prev - amount);
                        setAvailableBalance(prev => prev - amount);
                        setWithdrawAmount('');
                        alert(`Successfully withdrew $${amount.toLocaleString()}`);
                      } else {
                        alert('Invalid amount or insufficient funds');
                      }
                    }}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Withdraw Funds
                  </button>
                </div>
              </div>
            </div>

            {/* Investment Management */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">${investedAmount.toLocaleString()}</div>
                  <div className="text-gray-600">Total Invested</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+12.5%</div>
                  <div className="text-gray-600">Total Return</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-gray-600">Active Properties</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  View Portfolio
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Rebalance Portfolio
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Auto-Invest Settings
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
             <div className="bg-white p-6 rounded-lg shadow-sm border">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Account Activity</h3>
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead>
                     <tr className="border-b">
                       <th className="text-left py-2">Date</th>
                       <th className="text-left py-2">Type</th>
                       <th className="text-left py-2">Description</th>
                       <th className="text-right py-2">Amount</th>
                       <th className="text-right py-2">Balance</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="border-b">
                       <td className="py-2">Jan 15, 2024</td>
                       <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Deposit</span></td>
                       <td className="py-2">Bank Transfer</td>
                       <td className="py-2 text-right text-green-600">+$5,000</td>
                       <td className="py-2 text-right">$125,000</td>
                     </tr>
                     <tr className="border-b">
                       <td className="py-2">Jan 12, 2024</td>
                       <td className="py-2"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Investment</span></td>
                       <td className="py-2">Property Purchase - Downtown Condo</td>
                       <td className="py-2 text-right text-purple-600">-$15,000</td>
                       <td className="py-2 text-right">$120,000</td>
                     </tr>
                     <tr className="border-b">
                       <td className="py-2">Jan 10, 2024</td>
                       <td className="py-2"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Dividend</span></td>
                       <td className="py-2">Quarterly Dividend Payment</td>
                       <td className="py-2 text-right text-blue-600">+$1,250</td>
                       <td className="py-2 text-right">$135,000</td>
                     </tr>
                     <tr className="border-b">
                       <td className="py-2">Jan 08, 2024</td>
                       <td className="py-2"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Withdrawal</span></td>
                       <td className="py-2">Bank Transfer</td>
                       <td className="py-2 text-right text-red-600">-$2,500</td>
                       <td className="py-2 text-right">$133,750</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>

             {/* Account Settings & Preferences */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-lg shadow-sm border">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                     <input
                       type="text"
                       defaultValue={user?.firstName || 'User'}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                     <input
                       type="email"
                       defaultValue={user?.email || 'user@example.com'}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                     <input
                       type="tel"
                       defaultValue="+1 (555) 123-4567"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     />
                   </div>
                   <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                     Update Profile
                   </button>
                 </div>
               </div>

               <div className="bg-white p-6 rounded-lg shadow-sm border">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-medium text-gray-900">Email Notifications</h4>
                       <p className="text-sm text-gray-600">Receive updates via email</p>
                     </div>
                     <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                       <p className="text-sm text-gray-600">Get text message alerts</p>
                     </div>
                     <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-medium text-gray-900">Investment Updates</h4>
                       <p className="text-sm text-gray-600">Portfolio performance alerts</p>
                     </div>
                     <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-medium text-gray-900">Market News</h4>
                       <p className="text-sm text-gray-600">Real estate market updates</p>
                     </div>
                     <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                   </div>
                   <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                     Save Preferences
                   </button>
                 </div>
               </div>
             </div>

             {/* Security & Investment Preferences */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-lg shadow-sm border">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                       <p className="text-sm text-gray-600">Add extra security to your account</p>
                     </div>
                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Enabled</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-medium text-gray-900">Login Alerts</h4>
                       <p className="text-sm text-gray-600">Get notified of new logins</p>
                     </div>
                     <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                   </div>
                   <div className="space-y-2">
                     <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                       Change Password
                     </button>
                     <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                       Download Account Data
                     </button>
                   </div>
                 </div>
               </div>

               <div className="bg-white p-6 rounded-lg shadow-sm border">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Preferences</h3>
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                     <select 
                       value={riskTolerance}
                       onChange={(e) => setRiskTolerance(e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     >
                       <option value="Conservative">Conservative</option>
                       <option value="Moderate">Moderate</option>
                       <option value="Aggressive">Aggressive</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Invest Amount</label>
                     <input
                       type="number"
                       defaultValue="1000"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Investment Focus</label>
                     <select 
                       value={investmentFocus}
                       onChange={(e) => setInvestmentFocus(e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     >
                       <option value="Residential Properties">Residential Properties</option>
                       <option value="Mixed Portfolio">Mixed Portfolio</option>
                       <option value="Commercial Properties">Commercial Properties</option>
                       <option value="REITs Only">REITs Only</option>
                     </select>
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-medium text-gray-900">Auto-Reinvest Dividends</h4>
                       <p className="text-sm text-gray-600">Automatically reinvest returns</p>
                     </div>
                     <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                   </div>
                   <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                     Update Preferences
                   </button>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* Portfolio Tab - Only for Investor Users */}
        {activeTab === 'portfolio' && user?.type === 'investor' && (
          <div className="space-y-8">
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Invested</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(portfolioData.totalInvested)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(portfolioData.currentValue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Return</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(portfolioData.totalReturn)}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {formatPercentage((portfolioData.totalReturn / portfolioData.totalInvested) * 100)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(portfolioData.monthlyIncome)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {portfolioData.investments.length} properties
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Property Investments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Property Investments</h2>
              <div className="space-y-6">
                {portfolioData.investments.map((investment, index) => {
                  const returnPercentage = ((investment.currentValue - investment.investmentAmount) / investment.investmentAmount) * 100;
                  const isPositive = returnPercentage >= 0;
                  const property = investment.property;
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        {/* Property Image */}
                        <div className="md:w-1/3">
                          <div className="h-48 md:h-full bg-gray-200 relative">
                            {property.images && property.images[0] ? (
                              <img 
                                src={property.images[0]} 
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {formatPercentage(returnPercentage)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Property Details */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.title}</h3>
                              <p className="text-gray-600 mb-2">{property.type} Property</p>
                              <div className="flex items-center text-sm text-gray-500 mb-3">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          
                          {/* Investment Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-xs text-blue-600 font-medium mb-1">Your Investment</p>
                              <p className="text-lg font-bold text-blue-900">{formatCurrency(investment.investmentAmount)}</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <p className="text-xs text-green-600 font-medium mb-1">Current Value</p>
                              <p className="text-lg font-bold text-green-900">{formatCurrency(investment.currentValue)}</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <p className="text-xs text-purple-600 font-medium mb-1">Monthly Income</p>
                              <p className="text-lg font-bold text-purple-900">{formatCurrency(investment.monthlyReturn)}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${
                              isPositive ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                              <p className={`text-xs font-medium mb-1 ${
                                isPositive ? 'text-green-600' : 'text-red-600'
                              }`}>Total Return</p>
                              <p className={`text-lg font-bold ${
                                isPositive ? 'text-green-900' : 'text-red-900'
                              }`}>
                                {formatCurrency(investment.currentValue - investment.investmentAmount)}
                              </p>
                            </div>
                          </div>
                          
                          {/* Property Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                {property.details?.squareFeet && (
                                  <p>Size: {property.details.squareFeet.toLocaleString()} sq ft</p>
                                )}
                                {property.details?.yearBuilt && (
                                  <p>Built: {property.details.yearBuilt}</p>
                                )}
                                <p>Investment Date: {new Date(investment.investmentDate).toLocaleDateString()}</p>
                                {property.investment?.annualReturn && (
                                  <p>Expected Annual Return: {property.investment.annualReturn}</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Investment Overview</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                {property.investment?.investors && (
                                  <p>Total Investors: {property.investment.investors}</p>
                                )}
                                {property.investment?.totalInvestment && (
                                  <p>Total Investment: {formatCurrency(property.investment.totalInvestment)}</p>
                                )}
                                <p>Property Value: {formatCurrency(property.price)}</p>
                                <p>Status: <span className="capitalize text-green-600">{property.status}</span></p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Amenities */}
                          {property.amenities && property.amenities.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                              <div className="flex flex-wrap gap-2">
                                {property.amenities.map((amenity, amenityIndex) => (
                                  <span key={amenityIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Portfolio Diversification */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                 <h2 className="text-lg font-semibold text-gray-900 mb-6">Diversification by Property Type</h2>
                 <div className="space-y-4">
                   {(() => {
                     const typeBreakdown = portfolioData.investments.reduce((acc, investment) => {
                       const type = investment.property.type || 'Unknown';
                       if (!acc[type]) {
                         acc[type] = { value: 0, count: 0 };
                       }
                       acc[type].value += investment.currentValue;
                       acc[type].count += 1;
                       return acc;
                     }, {});
                     
                     return Object.entries(typeBreakdown).map(([type, data], index) => {
                       const percentage = (data.value / portfolioData.currentValue) * 100;
                       const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
                       
                       return (
                         <div key={type} className="flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                             <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
                             <div>
                               <p className="font-medium text-gray-900">{type}</p>
                               <p className="text-sm text-gray-600">{data.count} properties</p>
                             </div>
                           </div>
                           <div className="text-right">
                             <p className="font-medium text-gray-900">{formatCurrency(data.value)}</p>
                             <p className="text-sm text-gray-600">{percentage.toFixed(1)}%</p>
                           </div>
                         </div>
                       );
                     });
                   })()
                   }
                 </div>
               </div>
               
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                 <h2 className="text-lg font-semibold text-gray-900 mb-6">Diversification by Location</h2>
                 <div className="space-y-4">
                   {(() => {
                     const locationBreakdown = portfolioData.investments.reduce((acc, investment) => {
                       const location = investment.property.location || 'Unknown';
                       if (!acc[location]) {
                         acc[location] = { value: 0, count: 0 };
                       }
                       acc[location].value += investment.currentValue;
                       acc[location].count += 1;
                       return acc;
                     }, {});
                     
                     return Object.entries(locationBreakdown).map(([location, data], index) => {
                       const percentage = (data.value / portfolioData.currentValue) * 100;
                       const colors = ['bg-indigo-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'];
                       
                       return (
                         <div key={location} className="flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                             <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
                             <div>
                               <p className="font-medium text-gray-900">{location}</p>
                               <p className="text-sm text-gray-600">{data.count} properties</p>
                             </div>
                           </div>
                           <div className="text-right">
                             <p className="font-medium text-gray-900">{formatCurrency(data.value)}</p>
                             <p className="text-sm text-gray-600">{percentage.toFixed(1)}%</p>
                           </div>
                         </div>
                       );
                     });
                   })()
                   }
                 </div>
               </div>
             </div>

             {/* Portfolio Performance Chart */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
               <h2 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Performance Over Time</h2>
              <div className="h-64 flex items-end space-x-4">
                {portfolioData.investments.map((investment, index) => {
                  const height = (investment.currentValue / Math.max(...portfolioData.investments.map(inv => inv.currentValue))) * 200;
                  const returnPercentage = ((investment.currentValue - investment.investmentAmount) / investment.investmentAmount) * 100;
                  const isPositive = returnPercentage >= 0;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex items-end justify-center mb-2">
                        <div
                          className={`rounded-t-sm transition-all duration-500 ease-in-out ${
                            isPositive ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ height: `${height}px`, width: '80%' }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 text-center">
                        <div className="font-medium">{investment.property.title.substring(0, 10)}...</div>
                        <div className="text-green-600">{formatPercentage(returnPercentage)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
    <Footer />
    </div>
  );
};

export default DashboardPage;