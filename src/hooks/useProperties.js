import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  setLoading,
  setProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  setSelectedProperty,
  setError,
  clearError,
} from '@/store/slices/propertiesSlice';

/**
 * Custom hook for managing property data and operations
 * @returns {object} Properties state and actions
 */
export const useProperties = () => {
  const dispatch = useDispatch();
  const {
    properties,
    loading,
    error,
    selectedProperty,
  } = useSelector((state) => state.properties);

  // Load properties from JSON data
  const loadProperties = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
      const apiUrl = `${baseUrl}/api/properties`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to load properties: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      dispatch(setProperties(data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Add a new property
  const createProperty = useCallback((propertyData) => {
    try {
      const newProperty = {
        ...propertyData,
        id: Date.now(), // Simple ID generation for demo
        listedDate: new Date().toISOString().split('T')[0],
      };
      dispatch(addProperty(newProperty));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  // Update an existing property
  const editProperty = useCallback((propertyData) => {
    try {
      dispatch(updateProperty(propertyData));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  // Remove a property
  const removeProperty = useCallback((propertyId) => {
    try {
      dispatch(deleteProperty(propertyId));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  // Select a property for detailed view
  const selectProperty = useCallback((property) => {
    dispatch(setSelectedProperty(property));
  }, [dispatch]);

  // Clear any errors
  const clearPropertyError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Filter properties by status
  const getPropertiesByStatus = useCallback((status) => {
    return properties.filter(property => property.status === status);
  }, [properties]);

  // Get properties by type
  const getPropertiesByType = useCallback((type) => {
    return properties.filter(property => property.type === type);
  }, [properties]);

  // Calculate portfolio metrics
  const getPortfolioMetrics = useCallback(() => {
    if (properties.length === 0) {
      return {
        totalValue: 0,
        totalMonthlyRent: 0,
        averageROI: 0,
        totalProperties: 0,
      };
    }

    const totalValue = properties.reduce((sum, property) => sum + property.price, 0);
    const totalMonthlyRent = properties.reduce((sum, property) => {
      return sum + (property.investment?.monthlyRent || 0);
    }, 0);
    const averageROI = properties.reduce((sum, property) => {
      return sum + (property.investment?.annualReturn || 0);
    }, 0) / properties.length;

    return {
      totalValue,
      totalMonthlyRent,
      averageROI,
      totalProperties: properties.length,
    };
  }, [properties]);

  return {
    // State
    properties,
    loading,
    error,
    selectedProperty,
    
    // Actions
    loadProperties,
    createProperty,
    editProperty,
    removeProperty,
    selectProperty,
    clearPropertyError,
    
    // Computed values
    getPropertiesByStatus,
    getPropertiesByType,
    getPortfolioMetrics,
  };
};

export default useProperties;