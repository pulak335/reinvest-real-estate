'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Briefcase, 
  CreditCard, 
  DollarSign, 
  User, 
  LogOut,
  Bell,
  Plus,
  BarChart3
} from 'lucide-react';
import { FaChartLine } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState({
    monthlyIncome: 537.00,
    amountInvested: 108934.00,
    totalEarnings: 612500.00,
    lastLogin: '02.01.2022 15:48:13'
  });
  const [selectedBankOption, setSelectedBankOption] = useState('bank');
  const [withdrawAmount, setWithdrawAmount] = useState('100');
  const [withdrawMethod, setWithdrawMethod] = useState('PAYMENT METHOD');
  const [withdrawError, setWithdrawError] = useState('');
  
  // Account form state
  const [accountForm, setAccountForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [accountSaveMessage, setAccountSaveMessage] = useState('');
  
  // Security form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  // Handler functions for button clicks
  const handleShowAllInvestments = () => {
    setActiveTab('investments');
  };

  const handleShowAllIncome = () => {
    setActiveTab('transactions');
  };

  const handleShowAllNewInvestments = () => {
    // Navigate to properties page to show new investment opportunities
    router.push('/properties');
  };

  const handleBankAccountToggle = (option) => {
    setSelectedBankOption(option);
  };

  const handleGenerateReport = () => {
    // Generate and download investment report
    const reportData = {
      monthlyIncome: dashboardData.monthlyIncome,
      amountInvested: dashboardData.amountInvested,
      totalEarnings: dashboardData.totalEarnings,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `investment-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleExploreInvestments = () => {
    // Navigate to properties page to explore investment opportunities
    window.location.href = '/properties';
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    setWithdrawError('');
    
    // Validation
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      setWithdrawError('Please enter a valid amount');
      return;
    }
    
    if (amount > dashboardData.totalEarnings) {
      setWithdrawError('Insufficient funds');
      return;
    }
    
    if (withdrawMethod === 'PAYMENT METHOD') {
      setWithdrawError('Please select a payment method');
      return;
    }
    
    // Simulate withdrawal process
    alert(`Withdrawal of €${amount.toFixed(2)} via ${withdrawMethod} has been initiated. You will receive confirmation shortly.`);
    
    // Reset form
    setWithdrawAmount('100');
    setWithdrawMethod('PAYMENT METHOD');
  };
  
  const handleAccountFormChange = (field, value) => {
    setAccountForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSaveAccountChanges = (e) => {
    e.preventDefault();
    setAccountSaveMessage('');
    
    // Basic validation
    if (!accountForm.firstName.trim() || !accountForm.lastName.trim()) {
      setAccountSaveMessage('Please fill in your first and last name');
      return;
    }
    
    if (!accountForm.email.trim() || !accountForm.email.includes('@')) {
      setAccountSaveMessage('Please enter a valid email address');
      return;
    }
    
    // Simulate save process
    setAccountSaveMessage('Account information saved successfully!');
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setAccountSaveMessage('');
    }, 3000);
  };
  
  const handleUploadAvatar = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Avatar upload initiated for: ${file.name}. This feature will be implemented in the backend.`);
      }
    };
    input.click();
  };
  
  // Billing handlers
  const handleAddPaymentMethod = () => {
    alert('Add Payment Method modal would open here. This feature will be implemented with a proper payment integration.');
  };
  
  // Security handlers
  const handleEnable2FA = () => {
    alert('Two-Factor Authentication setup would begin here. This feature requires backend integration for SMS/authenticator setup.');
  };
  
  const handlePasswordFormChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPasswordMessage('');
    
    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage('Please fill in all password fields');
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters long');
      return;
    }
    
    // Simulate password update
    setPasswordMessage('Password updated successfully!');
    
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setPasswordMessage('');
    }, 3000);
  };
  
  const handleForgotPassword = () => {
    alert('Password reset email would be sent. This feature requires backend email integration.');
  };
  
  const handleAddSecurityMethod = () => {
    alert('Additional security method setup would open here. This requires backend integration.');
  };
  
  const handleDisableSMS = () => {
    if (confirm('Are you sure you want to disable SMS recovery? This will reduce your account security.')) {
      alert('SMS recovery has been disabled. This action requires backend integration.');
    }
  };
  
  const handleConfigureAuthenticator = () => {
    alert('Google Authenticator configuration would open here with QR code. This requires backend integration.');
  };
  
  const handleConfigureSSL = () => {
    alert('SSL Certificate configuration panel would open here. This is typically handled at the server level.');
  };
  
  const handleLogoutAllDevices = () => {
    if (confirm('Are you sure you want to log out from all devices? You will need to log in again on all your devices.')) {
      alert('Logged out from all devices successfully. This action requires backend session management.');
    }
  };
  
  const handleLogoutDevice = (deviceName) => {
    if (confirm(`Are you sure you want to log out from ${deviceName}?`)) {
      alert(`Logged out from ${deviceName} successfully. This action requires backend session management.`);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Tab content rendering function
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'investments':
        return renderInvestmentsContent();
      case 'transactions':
        return renderTransactionsContent();
      case 'withdraw':
        return renderWithdrawContent();
      case 'account':
        return renderAccountContent();
      default:
        return renderDashboardContent();
    }
  };

  // Dashboard tab content
  const renderDashboardContent = () => (
    <>
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          {
            label: 'Dashboard',
            href: '/dashboard',
            icon: BarChart3
          }
        ]}
      />
      {/* Main Dashboard Card */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold mb-2">€537,00</h2>
            <p className="text-purple-200 mb-6">Monthly Income</p>
            <p className="text-sm text-purple-200 mb-1">Last Month</p>
          </div>
          <div className="text-right">
            <div className="mb-4">
              <p className="text-sm text-purple-200">Amount Invested</p>
              <p className="text-xl font-semibold">€108,934.00</p>
            </div>
            <div>
              <p className="text-sm text-purple-200">Total Earnings</p>
              <p className="text-xl font-semibold">€12,600.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Investment Chart & My Investments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Chart</h3>
            <div className="h-64 relative">
              {/* Simple line chart representation */}
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 bg-green-400 rounded-t" style={{height: '60%'}}></div>
                  <span className="text-xs text-gray-500 mt-2">Mon</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 bg-green-400 rounded-t" style={{height: '80%'}}></div>
                  <span className="text-xs text-gray-500 mt-2">Tue</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 bg-green-400 rounded-t" style={{height: '70%'}}></div>
                  <span className="text-xs text-gray-500 mt-2">Wed</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 bg-green-400 rounded-t" style={{height: '90%'}}></div>
                  <span className="text-xs text-gray-500 mt-2">Thu</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 bg-green-400 rounded-t" style={{height: '75%'}}></div>
                  <span className="text-xs text-gray-500 mt-2">Fri</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 bg-green-400 rounded-t" style={{height: '85%'}}></div>
                  <span className="text-xs text-gray-500 mt-2">Sat</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 bg-green-400 rounded-t" style={{height: '65%'}}></div>
                  <span className="text-xs text-gray-500 mt-2">Sun</span>
                </div>
              </div>
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                <span>$420</span>
                <span>$350</span>
                <span>$280</span>
                <span>$210</span>
                <span>$140</span>
                <span>$70</span>
              </div>
            </div>
          </div>

          {/* My Investments */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">My Investments</h3>
              <button 
                onClick={handleShowAllInvestments}
                className="text-purple-600 text-sm hover:text-purple-700 cursor-pointer"
              >
                Show All →
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-15 h-15 bg-gray-300 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Modern Apartment</h4>
                  <p className="text-sm text-gray-500">Berlin, Germany</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">€25,000</p>
                  <p className="text-sm text-green-600">+12.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Bank Account & Last Income */}
        <div className="space-y-6">
          {/* Bank Account & Credit Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex space-x-4 mb-4">
              <button 
                onClick={() => handleBankAccountToggle('bank')}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
                  selectedBankOption === 'bank' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Bank Account
              </button>
              <button 
                onClick={() => handleBankAccountToggle('credit')}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
                  selectedBankOption === 'credit' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Credit Card
              </button>
            </div>
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-300 text-sm">Card No.</p>
                  <p className="font-mono">**** **** **** 4567</p>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-gray-800 font-bold text-xs">+</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 text-xs">EXPIRY DATE</p>
                  <p className="text-sm">09/24</p>
                </div>
                <div>
                  <p className="text-gray-300 text-xs">CURRENCY</p>
                  <p className="text-sm">USD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Income */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Last Income</h3>
              <button 
                onClick={handleShowAllIncome}
                className="text-purple-600 text-sm hover:text-purple-700 cursor-pointer"
              >
                Show All →
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">G</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Geroldstein | Am Rosbach 1-17</p>
                  <p className="text-sm text-gray-500">18.03.2022</p>
                </div>
                <p className="font-semibold text-gray-900">€302,50</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">G</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Geroldstein | Am Rosbach 1-17</p>
                  <p className="text-sm text-gray-500">18.03.2022</p>
                </div>
                <p className="font-semibold text-gray-900">€302,50</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">G</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Geroldstein | Am Rosbach 1-17</p>
                  <p className="text-sm text-gray-500">18.03.2022</p>
                </div>
                <p className="font-semibold text-gray-900">€302,50</p>
              </div>
            </div>
          </div>

          {/* New Investments */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Investments</h3>
              <button 
                onClick={handleShowAllNewInvestments}
                className="text-purple-600 text-sm hover:text-purple-700 cursor-pointer"
              >
                Show All →
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-15 h-15 bg-gray-300 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Los Angeles</h4>
                  <p className="text-sm text-gray-500">California, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Investments tab content
  const renderInvestmentsContent = () => (
    <>
      <Breadcrumb 
        items={[
          {
            label: 'Home',
            href: '/dashboard'
          },
          {
            label: 'Investments',
            href: '/dashboard',
            icon: Briefcase
          }
        ]}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Transactions Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Invested</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Invested</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                        <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                        <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                        <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                        <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                        <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Investment Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Investment Chart</h3>
              <button 
                onClick={handleGenerateReport}
                className="text-purple-600 text-sm hover:text-purple-700 cursor-pointer"
              >
                Generate Report
              </button>
            </div>
            <div className="h-64 relative">
              {/* SVG Chart */}
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 150 Q 50 120 100 130 T 200 110 T 300 120 T 400 140"
                  stroke="#10B981"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 0 150 Q 50 120 100 130 T 200 110 T 300 120 T 400 140 L 400 200 L 0 200 Z"
                  fill="url(#chartGradient)"
                />
              </svg>
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>$420</span>
                <span>$350</span>
                <span>$280</span>
                <span>$210</span>
                <span>$140</span>
                <span>$70</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Statistics and Explore More */}
        <div className="space-y-6">
          {/* Statistics Card */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Statistics</h3>
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">€537,00</div>
            <div className="text-purple-200">Monthly Income</div>
          </div>

          {/* Explore More Card */}
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore More</h3>
                <p className="text-sm text-gray-600">Investment opportunities</p>
              </div>
              <div className="w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full">
                  <circle cx="32" cy="32" r="30" fill="#10B981" opacity="0.1" />
                  <circle cx="32" cy="32" r="20" fill="#10B981" opacity="0.2" />
                  <circle cx="32" cy="32" r="10" fill="#10B981" opacity="0.3" />
                  <path d="M28 28 L36 32 L28 36 Z" fill="#10B981" />
                </svg>
              </div>
            </div>
            <button 
              onClick={handleExploreInvestments}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Transactions tab content
  const renderTransactionsContent = () => (
    <>
      <Breadcrumb 
        items={[
          {
            label: 'Home',
            href: '/dashboard'
          },
          {
            label: 'Transactions',
            href: '/dashboard',
            icon: CreditCard
          }
        ]}
      />
      
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header with title and transaction count */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
            <div className="text-sm text-purple-600 font-medium">
              Total Number of Transactions <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full ml-1">(10)</span>
            </div>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Project</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount Invested</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Payment Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date / Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-blue-600">$500.00</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 font-medium">Paypal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-blue-600">$500.00</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 font-medium">Paypal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-blue-600">$500.00</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 font-medium">Paypal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-blue-600">$500.00</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 font-medium">Paypal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-900">A19, Vilnius</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-blue-600">$500.00</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 font-medium">Paypal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.03.2022</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Withdraw tab content
  const renderWithdrawContent = () => (
    <>
      <Breadcrumb 
        items={[
          {
            label: 'Home',
            href: '/dashboard'
          },
          {
            label: 'Withdraw',
            href: '/dashboard',
            icon: DollarSign
          }
        ]}
      />
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdraw Funds</h2>
        <p className="text-gray-600 mb-8">Use the form below to withdraw from wallet instantly</p>
        
        <form onSubmit={handleWithdraw} className="max-w-md">
          {withdrawError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {withdrawError}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input 
              type="number" 
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="100"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="1"
              step="0.01"
            />
            <p className="text-sm text-gray-500 mt-1">Available: €{formatCurrency(dashboardData.totalEarnings)}</p>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="relative">
              <select 
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 appearance-none"
                value={withdrawMethod}
                onChange={(e) => setWithdrawMethod(e.target.value)}
              >
                <option value="PAYMENT METHOD">PAYMENT METHOD</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-violet-900 text-white py-4 rounded-lg hover:bg-violet-700 font-medium text-lg cursor-pointer transition-colors"
          >
            Withdraw
          </button>
        </form>
      </div>
    </>
  );

  // Account tab content
  const [activeAccountTab, setActiveAccountTab] = useState('general');
  
  const renderAccountContent = () => (
    <>
      <Breadcrumb 
        items={[
          {
            label: 'Home',
            href: '/dashboard'
          },
          {
            label: 'Account',
            href: '/dashboard',
            icon: User
          }
        ]}
      />
      
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="flex justify-items-center border-b gap-5 border-gray-200 w-full">
          <button
            onClick={() => setActiveAccountTab('general')}
            className={`px-6 py-4 text-sm font-medium rounded-tl-xl ${
              activeAccountTab === 'general'
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-700 bg-gray-50'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveAccountTab('billing')}
            className={`px-6 py-4 text-sm font-medium ${
              activeAccountTab === 'billing'
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-700 bg-gray-50'
            }`}
          >
            Billing
          </button>
          <button
            onClick={() => setActiveAccountTab('security')}
            className={`px-6 py-4 text-sm font-medium rounded-tr-xl ${
              activeAccountTab === 'security'
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-700 bg-gray-50'
            }`}
          >
            Security
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeAccountTab === 'general' && (
            <div className="space-y-8">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-lg">
                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Your Avatar</h3>
                  <p className="text-sm text-gray-500">Profile picture size: 400px x 400px</p>
                </div>
                <button 
                  onClick={handleUploadAvatar}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium cursor-pointer"
                >
                  Upload new avatar
                </button>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSaveAccountChanges}>
                {accountSaveMessage && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    accountSaveMessage.includes('successfully') 
                      ? 'bg-green-100 border border-green-400 text-green-700' 
                      : 'bg-red-100 border border-red-400 text-red-700'
                  }`}>
                    {accountSaveMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
                    <input 
                      type="text" 
                      placeholder="First Name"
                      value={accountForm.firstName}
                      onChange={(e) => handleAccountFormChange('firstName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Last Name"
                      value={accountForm.lastName}
                      onChange={(e) => handleAccountFormChange('lastName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter Your Email"
                      value={accountForm.email}
                      onChange={(e) => handleAccountFormChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      placeholder="345-323-1234"
                      value={accountForm.phone}
                      onChange={(e) => handleAccountFormChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                    />
                  </div>
                </div>

                {/* Save Changes Button */}
                <button 
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </form>

              {/* Notifications Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                
                <div className="space-y-4">
                  {/* Announcements */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Announcements</h4>
                      <p className="text-sm text-gray-500">Occasional announcements of new features</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input 
                        type="checkbox" 
                        defaultChecked
                        className="sr-only peer"
                        id="announcements"
                      />
                      <label 
                        htmlFor="announcements"
                        className="block w-12 h-6 bg-green-500 rounded-full cursor-pointer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-500 peer-unchecked:bg-gray-300"
                      >
                        <span className="block w-5 h-5 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-6 translate-x-0.5 mt-0.5"></span>
                      </label>
                    </div>
                  </div>

                  {/* Feedback requests */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Feedback requests</h4>
                      <p className="text-sm text-gray-500">Occasional requests for feedback</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input 
                        type="checkbox" 
                        defaultChecked
                        className="sr-only peer"
                        id="feedback"
                      />
                      <label 
                        htmlFor="feedback"
                        className="block w-12 h-6 bg-green-500 rounded-full cursor-pointer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-500 peer-unchecked:bg-gray-300"
                      >
                        <span className="block w-5 h-5 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-6 translate-x-0.5 mt-0.5"></span>
                      </label>
                    </div>
                  </div>

                  {/* Billing and account */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Billing and account</h4>
                      <p className="text-sm text-gray-500">Transactional emails and account notifications</p>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">Legally Obligated</span>
                  </div>
                </div>
              </div>

              {/* Delete Account Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Delete your account</h3>
                <p className="text-sm text-gray-600">
                  Before deleting your account, please note that if you delete your account, Dash cannot recover it.
                </p>
                <button className="bg-pink-100 text-pink-600 px-6 py-3 rounded-lg hover:bg-pink-200 font-medium border border-pink-200">
                  Delete
                </button>
              </div>
            </div>
          )}
          
          {activeAccountTab === 'billing' && (
            <div className="space-y-8">
              {/* Payment Methods Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                  <button 
                    onClick={handleAddPaymentMethod}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer"
                  >
                    Add Method
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Visa Card */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">VISA</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Visa ending in 1234</h3>
                        <p className="text-sm text-gray-500">Expires 1/2025</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Default
                    </span>
                  </div>

                  {/* Mastercard */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
                        <div className="flex space-x-0.5">
                          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Mastercard ending in 1234</h3>
                        <p className="text-sm text-gray-500">Expires 1/2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoices Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Invoices</h2>
                
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">INVOICE ID</div>
                    <div className="text-sm font-medium text-gray-900">AMOUNT</div>
                    <div className="text-sm font-medium text-gray-900">DATE</div>
                    <div className="text-sm font-medium text-gray-900">STATUS</div>
                  </div>
                  
                  {/* Table Rows */}
                  <div className="divide-y divide-gray-200">
                    {/* Invoice 1 */}
                    <div className="grid grid-cols-4 gap-4 p-4">
                      <div className="text-sm text-purple-600 font-medium">Invoice #123</div>
                      <div className="text-sm text-gray-900">$500.00</div>
                      <div className="text-sm text-gray-900">18.03.2022</div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-900">Processing</span>
                      </div>
                    </div>
                    
                    {/* Invoice 2 */}
                    <div className="grid grid-cols-4 gap-4 p-4">
                      <div className="text-sm text-purple-600 font-medium">Invoice #123</div>
                      <div className="text-sm text-gray-900">$500.00</div>
                      <div className="text-sm text-gray-900">18.03.2022</div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-900">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeAccountTab === 'security' && (
            <div className="space-y-8">
              {/* Two Factor Authentication Section */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Two Factor Authentication</h3>
                    <p className="text-sm text-purple-700">
                      Two-Factor Authentication (2FA) can be used to help protect your account
                    </p>
                  </div>
                  <button 
                    onClick={handleEnable2FA}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-medium cursor-pointer"
                  >
                    Enable
                  </button>
                </div>
              </div>

              {/* Change Password Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-gray-600 mb-6">
                      You can always change your password for security reasons or reset your password in case you forgot it.
                    </p>
                    <button 
                      onClick={handleForgotPassword}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm bg-purple-50 px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    {passwordMessage && (
                      <div className={`p-3 rounded-lg ${
                        passwordMessage.includes('successfully') 
                          ? 'bg-green-100 border border-green-400 text-green-700' 
                          : 'bg-red-100 border border-red-400 text-red-700'
                      }`}>
                        {passwordMessage}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Current Password</label>
                      <input 
                        type="password" 
                        placeholder="Current Password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => handlePasswordFormChange('currentPassword', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
                      <input 
                        type="password" 
                        placeholder="New Password"
                        value={passwordForm.newPassword}
                        onChange={(e) => handlePasswordFormChange('newPassword', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="Confirm Password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => handlePasswordFormChange('confirmPassword', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium cursor-pointer transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>

              {/* Additional Security Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Additional Security</h2>
                  <button 
                    onClick={handleAddSecurityMethod}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer"
                  >
                    Add Method
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* SMS Recovery */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS recovery</h3>
                      <p className="text-sm text-gray-500">Number ending with 1234</p>
                    </div>
                    <button 
                      onClick={handleDisableSMS}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium text-sm cursor-pointer"
                    >
                      Disable SMS
                    </button>
                  </div>

                  {/* Authenticator App */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Authenticator App</h3>
                      <p className="text-sm text-gray-500">Google Authenticator</p>
                    </div>
                    <button 
                      onClick={handleConfigureAuthenticator}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm bg-purple-50 px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Configure
                    </button>
                  </div>

                  {/* SSL Certificate */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">SSL Certificate</h3>
                      <p className="text-sm text-gray-500">Secure Sockets Layer</p>
                    </div>
                    <button 
                      onClick={handleConfigureSSL}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm bg-purple-50 px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </div>

              {/* Your Devices Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Your devices</h2>
                  <button 
                    onClick={handleLogoutAllDevices}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer"
                  >
                    Log out on all devices
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-8 bg-gray-400 rounded-sm"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Iphone 13 Pro Max</h3>
                        <p className="text-sm text-gray-500">New York City • June 20 at 14:00</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleLogoutDevice('iPhone 13 Pro Max')}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm bg-purple-50 px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <ProtectedRoute>
      <div className="h-screen bg-gray-50">
        {/* Top Header - Sticky and Full Width */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Revest</span>
            </Link>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Investments</span>
              </button>
              
              {/* Notification Bell */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-6 h-6" />
                </button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              
              {/* Language Selector */}
              <select className="text-gray-600 bg-transparent border-none focus:outline-none">
                <option value="en">EN</option>
                <option value="de">DE</option>
                <option value="fr">FR</option>
              </select>
              
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">P</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar - Sticky */}
          <aside className="w-64 bg-white shadow-lg flex flex-col sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
            <div className="p-6 flex-1">
              {/* Navigation */}
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-3 w-full p-3 text-left rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'dashboard' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('investments')}
                  className={`flex items-center space-x-3 w-full p-3 text-left rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'investments' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Investments</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className={`flex items-center space-x-3 w-full p-3 text-left rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'transactions' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Transactions</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('withdraw')}
                  className={`flex items-center space-x-3 w-full p-3 text-left rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'withdraw' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Withdraw</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center space-x-3 w-full p-3 text-left rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'account' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account</span>
                </button>
                
                <button 
                  onClick={logout}
                  className="flex items-center space-x-3 w-full p-3 text-left text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors mb-2 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
              
              {/* Last Login Info */}
              <div className="mt-auto pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                  <span>02.01.2022</span>
                  <span>16:48:13</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;