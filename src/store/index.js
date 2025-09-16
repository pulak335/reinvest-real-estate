import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
  },
});

export default store;