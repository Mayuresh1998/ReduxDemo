import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../slice/ProductSlice';
import { getApiCall } from '../services/GetApiCall';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    [getApiCall.reducerPath]: getApiCall.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(getApiCall.middleware),
});

setupListeners(store.dispatch);
