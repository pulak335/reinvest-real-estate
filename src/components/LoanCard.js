import Image from 'next/image';
import Link from 'next/link';

const LoanCard = ({ loan }) => {
  const progressPercentage = (loan.collectedAmount / loan.targetAmount) * 100;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Featured Badge */}
      {loan.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold transform -rotate-12">
            Featured Loan
          </div>
        </div>
      )}
      
      {/* Company Logo */}
      <div className="relative h-32 bg-gray-50 flex items-center justify-center">
        <Image
          src={loan.logo}
          alt={loan.companyName}
          width={120}
          height={80}
          className="object-contain"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Industry */}
        <p className="text-sm text-gray-500 mb-2">{loan.industry}</p>
        
        {/* Company Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-4">{loan.companyName}</h3>
        
        {/* Collected Amount */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Collected Amount</p>
          <p className="text-xl font-bold text-purple-600">
            {formatNumber(loan.investors)} Investors | {formatCurrency(loan.collectedAmount)} ({progressPercentage.toFixed(1)}%)
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Investment Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Annual Return</p>
            <p className="font-semibold text-green-600">{loan.annualReturn}% + 3%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Maximum Term</p>
            <p className="font-semibold">{loan.maximumTerm} Months</p>
          </div>
        </div>
        
        {/* Investment Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Left to Invest</p>
            <p className="font-bold text-purple-600">
              {formatCurrency(loan.minimumInvestment)}:17H:46M
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors text-sm font-medium">
              Invest Now
            </button>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Business loan #{loan.id.toString().padStart(4, '0')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;