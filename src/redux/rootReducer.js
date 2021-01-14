import { combineReducers } from 'redux'

import userReducer from './Users/user.reducer'
import productReducer from './Products/products.reducer'

export default combineReducers({
  user: userReducer,
  productsData: productReducer
});