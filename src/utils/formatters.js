/**
 * Utility functions for formatting data in the real estate application
 */

/**
 * Format currency values
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format percentage values
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format square footage
 * @param {number} sqft - Square footage value
 * @returns {string} Formatted square footage string
 */
export const formatSquareFeet = (sqft) => {
  return `${sqft.toLocaleString()} sq ft`;
};

/**
 * Format date strings
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format property address
 * @param {object} address - Address object
 * @returns {string} Formatted address string
 */
export const formatAddress = (address) => {
  const { street, city, state, zipCode } = address;
  return `${street}, ${city}, ${state} ${zipCode}`;
};

/**
 * Calculate and format ROI
 * @param {number} monthlyRent - Monthly rental income
 * @param {number} propertyPrice - Property purchase price
 * @returns {number} ROI percentage
 */
export const calculateROI = (monthlyRent, propertyPrice) => {
  const annualRent = monthlyRent * 12;
  return (annualRent / propertyPrice) * 100;
};

/**
 * Format property status with appropriate styling classes
 * @param {string} status - Property status
 * @returns {object} Status with styling information
 */
export const formatPropertyStatus = (status) => {
  const statusMap = {
    available: {
      label: 'Available',
      className: 'bg-green-100 text-green-800',
    },
    pending: {
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-800',
    },
    sold: {
      label: 'Sold',
      className: 'bg-red-100 text-red-800',
    },
    rented: {
      label: 'Rented',
      className: 'bg-blue-100 text-blue-800',
    },
  };

  return statusMap[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800',
  };
};