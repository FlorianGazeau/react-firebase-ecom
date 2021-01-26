import cartTypes from './cart.types'
import { handleAddToCart, handleReduceCartItem } from './cart.utils'

const INITIAL_STATE = {
  cartItems: []
}

const cartReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload
        })
      }
    case cartTypes.DELETE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItems => cartItems.documentID !== action.payload)
      }
    case cartTypes.REDUCE_QUANTITY_PRODUCT:
      return {
        ...state,
        cartItems: handleReduceCartItem({
          prevCartItems: state.cartItems,
          cartItemReduce: action.payload
        })
      }
    default:
      return state;
  }
}

export default cartReducer