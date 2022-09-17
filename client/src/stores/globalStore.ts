import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { generalApi } from 'lib/generalApi';
import { authApi } from 'features/auth';

export const rootReducer = combineReducers({
  [generalApi.reducerPath]: generalApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApi.middleware, authApi.middleware),
});
