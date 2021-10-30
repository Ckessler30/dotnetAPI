import { configureStore } from '@reduxjs/toolkit';
import allEmpsReducer from './Employee';

export const store = configureStore({
  reducer: {
    employees: allEmpsReducer,
  },
});
