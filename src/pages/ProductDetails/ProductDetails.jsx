import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct} from '../../redux/Products/products.actions'
import {useParams} from 'react-router-dom'

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
    <div>
      <h1>{product.name}</h1>
      <img src={product.img} alt=""/>
      <p>{product.price}<span>$</span></p>

    </div>
  );
}

export default ProductDetails;
