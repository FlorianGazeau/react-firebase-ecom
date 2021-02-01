export const existingCartItem =({
  prevCartItems,
  nextCartItem
}) => {
  return prevCartItems.find(
    cartItem => cartItem.documentID === nextCartItem.documentID
  )
}

export const handleAddToCart = ({
  prevCartItems,
  nextCartItem
}) => {
  const quantityIncrement = 1
  const cartItemExist = existingCartItem({prevCartItems, nextCartItem})

  if (cartItemExist) {
    return prevCartItems.map(cartItem =>
      cartItem.documentID === nextCartItem.documentID
      ? {
        ...cartItem,
        quantity: cartItem.quantity + quantityIncrement
      } : cartItem
      )
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement
    }
  ]
}

export const handleReduceCartItem = ({
  prevCartItems,
  cartItemReduce
}) => {
  const existingCartItem = prevCartItems.find(cartItem =>
    cartItem.documentID === cartItemReduce.documentID)

  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      cartItem => cartItem.documentID !== existingCartItem.documentID
    )
  }

  return prevCartItems.map(cartItem =>
    cartItem.documentID === existingCartItem.documentID ?
    {
      ...cartItem,
      quantity: cartItem.quantity - 1
    } : cartItem)
}