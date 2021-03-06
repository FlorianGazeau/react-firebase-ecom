import { combineReducers } from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './Users/user.reducer'
import productReducer from './Products/products.reducer'
import cartReducer from './Cart/cart.reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productReducer,
  cartData: cartReducer
});

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['cartData']
}

export default persistReducer(configStorage, rootReducer)