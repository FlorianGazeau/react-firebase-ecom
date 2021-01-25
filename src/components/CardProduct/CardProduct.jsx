import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addProduct} from '../../redux/Cart/cart.actions'
import Button from '../Form/Button/Button';

const CardProduct = ({ img, price, name, documentID }) => {
  
  const dispatch = useDispatch()

  const handleAddProduct = (img, price, name, documentID) => {
    const product = {img, price, name, documentID}
    dispatch(addProduct(product))
  }

  return (
    <div className='card-product'>
      <div className="card-thumbnail">
        <Link to={`product/${documentID}`}>
          <img src={img} alt={name}/>
        </Link>
      </div>
      <h4 className="card-title">{name}</h4>
      <p className="card-price">{price}<span>$</span></p>
      <Button onClick={() => handleAddProduct(img, price, name, documentID)}>
        ADD TO CART
      </Button>
    </div>
  );
}

export default CardProduct;
