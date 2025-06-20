import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import reducers
import socialMediaReducer from './socialMediaSlice';

const rootReducer = combineReducers({
  socialMedia: socialMediaReducer,
  // Add more reducers as needed
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
