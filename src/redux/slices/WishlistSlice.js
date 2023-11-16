const {createSlice} = require('@reduxjs/toolkit');
const {act} = require('react-test-renderer');

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToWIshList(state, action) {
      let tempData = state.data;
      tempData.push(action.payload);
      state.data = tempData;
    },
  },
});
export const {addItemToWIshList}= WishlistSlice.actions;
export default WishlistSlice.reducer;
