// productSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    saveProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    fetchProductById: (state, action) => {
      return state.products.find(product => product.id === action.payload);
    },
  },
});

export const { setLoading, saveProducts, setError, fetchProductById } = productsSlice.actions;
export default productsSlice.reducer;
