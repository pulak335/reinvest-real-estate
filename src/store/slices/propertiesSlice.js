import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  loading: false,
  error: null,
  selectedProperty: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProperty: (state, action) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state, action) => {
      const index = state.properties.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter(p => p.id !== action.payload);
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  setSelectedProperty,
  setError,
  clearError,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;