import cartTypes from './cart.types'

export const addProduct = (nextCartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCartItem
})

export const deleteProduct = ({documentID}) =>({
  type: cartTypes.DELETE_TO_CART,
  payload: documentID
})

export const reduceQuantityProduct = (product) => ({
  type: cartTypes.REDUCE_QUANTITY_PRODUCT,
  payload: product
})