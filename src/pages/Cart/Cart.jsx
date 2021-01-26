import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, reduceQuantityProduct } from '../../redux/Cart/cart.actions';
import './Cart.css'

const mapSate = ({cartData}) => ({
  products: cartData.cartItems,
})

const Cart = () => {

  const { products, quantity } = useSelector(mapSate)

  const dispatch = useDispatch()

  const handleAddQuantityProduct = (documentID) => {
    dispatch(addProduct({documentID}))
  }
  const handleReduceQuantityProduct = (product) => {
    // console.log(product)
    dispatch(reduceQuantityProduct(product))
    // dispatch(reduceQuantityProduct({product}))
  }
  const handleDeleteProductFromChart = (documentID) => {
    dispatch(deleteProduct({documentID}))
  }

  return (
    <div className='cart'>
      <h2 className='cart-title'>Your Cart</h2>
      <div className='cart-content'>
        {products && products.map((data, i) => {
          const { img, price, name, quantity, documentID } = data
          const finalPrice = (price * quantity)

          return (
            <div className='cart-item'>
              <div className='cart-thumbnail'>
                <img src={img} alt={name}/>
              </div>
              <h4 className='cart-name'>{name}</h4>
              <div className='cart-metadata'>
                <div className='cart-quantity'>
                <i class="fas fa-minus" onClick={() => handleReduceQuantityProduct(data)}></i>
                  <span>{quantity}</span>
                  <i class="fas fa-plus" onClick={() => handleAddQuantityProduct(documentID)}></i>
                </div>
                <div className='cart-price'>
                  <span>{finalPrice}$</span>
                </div>
              </div>
              <div className='cart-remove'>
                <span onClick={() => handleDeleteProductFromChart(documentID)} ><i class="fas fa-times"></i></span>
              </div>
            </div>
          )
        })}
      </div>
      <div>
      </div>
    </div>
  );
}

export default Cart;
