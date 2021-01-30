import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, reduceQuantityProduct } from '../../redux/Cart/cart.actions';
import { createStructuredSelector} from 'reselect'
import { selectCartTotal } from '../../redux/Cart/cart.selectors';
import {useSpring, animated} from 'react-spring'

import './Cart.css'
import Cross from '../../assets/cancel.svg'
import Plus from '../../assets/plus.svg'
import Minus from '../../assets/remove.svg'
import Button from '../Form/Button/Button';

const mapSate = ({cartData}) => ({
  products: cartData.cartItems,
})

const mapStateSelect = createStructuredSelector({
  total: selectCartTotal
});

const Cart = (props) => {
  
  const { products } = useSelector(mapSate)
  const { total } = useSelector(mapStateSelect)
  // const [close, toggle] = useState(false)
  const dispatch = useDispatch()

  
  const handleAddQuantityProduct = (documentID) => {
    dispatch(addProduct({documentID}))
  }
  const handleReduceQuantityProduct = (product) => {
    dispatch(reduceQuantityProduct(product))
  }
  const handleDeleteProductFromChart = (documentID) => {
    dispatch(deleteProduct({documentID}))
  }

  if (!props.show) {
    return null
  }

  return (
    <div className='cart' onClick={props.onClose}>
      <div className={props.show ? `cart-content` : 'closeNav'} onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Cart</h3>
          <img src={Cross} alt="cross icon" onClick={props.onClose}/>
        </div>
        <div className="cart-body">
          {products && products.map((data, i) => {
            const { img, price, name, quantity, documentID } = data

            return (
                <animated.div className="cart-item">
                  <div className="cart-thumbnail">
                    <img src={img} alt={name}/>
                  </div>
                  <div className="cart-info">
                    <div>
                      <h4 className="cart-title">{name}</h4>
                      <span className='cart-price'>${price}</span>
                    </div>
                    <div className='cart-data'>
                      <div className='cart-quantity'>
                        <img src={Minus} alt="" onClick={() => handleReduceQuantityProduct(data)}/>
                        <span>{quantity}</span>
                        <img src={Plus} alt="" onClick={() => handleAddQuantityProduct(documentID)}/>
                      </div>
                      <p className='cart-remove' onClick={() => handleDeleteProductFromChart(documentID)}>remove</p>
                    </div>
                  </div>
                </animated.div>
            )
          })}
        </div>
        <div className="cart-footer">
          <p>Shipping & taxes calculated at checkout</p>
          <Button className='btn-checkout'>
            <span>Checkout</span>
            <span>${total}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
