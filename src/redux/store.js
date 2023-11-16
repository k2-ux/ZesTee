const {configureStore} = require('@reduxjs/toolkit');

import ProductReduer from '../redux/slices/ProductSlice';
import WishlistReducer from '../redux/slices/WishlistSlice';
import CartReducer from '../redux/slices/CartSlice';
import AddressReducer from '../redux/slices/AddressSlice';
import OrderReducer from '../redux/slices/OrderSlice';
export const store = configureStore({
  reducer: {
    product: ProductReduer,
    wishlist: WishlistReducer,
    cart: CartReducer,
    address: AddressReducer,
    order: OrderReducer,
  },
});