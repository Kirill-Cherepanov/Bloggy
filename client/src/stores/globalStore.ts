import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSlice } from 'features/auth';
import { generalApi } from 'lib/generalApi';

export const rootReducer = combineReducers({
  [generalApi.reducerPath]: generalApi.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApi.middleware),
});
