import {createSlice} from '@reduxjs/toolkit';

const ProductSice = createSlice({
  name: 'Product',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    addProducts(state, action) {
      state.data = action.payload;
    },
  },
});


export const {addProducts} = ProductSice.actions;
export default ProductSice.reducer;