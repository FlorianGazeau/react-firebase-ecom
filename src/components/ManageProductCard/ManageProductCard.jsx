import React from 'react';
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../redux/Products/products.actions';

import Button from '../Form/Button/Button'
import './ManageProductCard.css'

const ManageProductCard = ({ productName, productThumbnail, productPrice, documentID }) => {

  const dispatch = useDispatch()

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({
      documentID
    }))
  }

  return (
    <div className='card-product'>
      <div className="card-thumbnail">
        <img src={productThumbnail} alt={productName}/>
      </div>
      <div className='card-wrapper'>
        <h4 className="card-title">{productName}</h4>
      </div>
      <p className="card-price">{productPrice}<span>$</span></p>
      <Button onClick={handleDeleteProduct} className='btn-cart'>
        delete product
      </Button>
    </div>
  );
}

export default ManageProductCard;
