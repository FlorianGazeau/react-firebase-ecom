import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct} from '../../redux/Products/products.actions'
import {useParams} from 'react-router-dom'
import Button from '../../components/Form/Button/Button';

import './ProductDetails.css'

const mapState = ({productsData}) => ({
  product: productsData.productDetails
})

const ProductDetails = () => {

  const { product } = useSelector(mapState)
  const dispatch = useDispatch()
  const productID = useParams()

  useEffect(() => {
    dispatch(fetchProduct(productID))
  }, []);
  
  
  return (
    <div className='product-details'>
      <div className='product-details-wrapper'>
        <div className='product-details-thumbnail'>
          <img src={product.img} alt={product.name}/>
        </div>
        <div className="product-details-info">
          <h1 className='product-details-title'>{product.name}</h1>
          <p className='product-details-price'>{product.price}<span>$</span></p>
          <div className='product-details-text-wrapper'>
            <p className='product-details-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nunc odio risus, porta sed imperdiet non, lobortis ut ante. Nullam dictum feugiat quam ut varius. 
            Maecenas eget enim hendrerit, euismod mauris non, dignissim augue.</p>
          </div>
          <Button className='btn-cart'>
            ADD TO CART
          </Button>
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;
