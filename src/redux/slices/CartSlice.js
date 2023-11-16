const {createSlice} = require('@reduxjs/toolkit');
const {act} = require('react-test-renderer');

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      let isItemExist = false;
      let tempData = state.data;
      tempData.map(item => {
        if (item.id == action.payload.id) {
          isItemExist = true;
          item.qty = item.qty + 1;
        } else {
          console.log('??');
        }
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }
      state.data = tempData;
    },
    reduceItemfromCart(state, action) {
      // let isItemExist = false;
      let tempData = state.data;
      tempData.map(item => {
        if (item.id == action.payload.id) {
          
            item.qty = item.qty - 1;
        
      }});
      // if (!isItemExist) {
      //   tempData.push(action.payload);
      // }
      state.data = tempData;
    },
    removeItemfromCart(state, action) {
      let tempData = state.data;
    tempData.splice(action.payload,1)
      
      state.data = tempData;
    },
    emptyCart(state, action) {
      state.data = action.payload;
    },
  },
});
export const {addItemToCart,reduceItemfromCart,emptyCart,removeItemfromCart} = CartSlice.actions;
export default CartSlice.reducer;
