import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
});

export default store;