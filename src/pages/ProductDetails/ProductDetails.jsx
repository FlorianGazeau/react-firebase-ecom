import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct} from '../../redux/Products/products.actions'
import {useParams} from 'react-router-dom'

const mapState = ({productsData}) => ({
  product: productsData.ProductDetails
})

const ProductDetails = () => {

  const { product } = useSelector(mapState)
  const dispatch = useDispatch()
  const productID = useParams()

  useEffect(() => {
    dispatch(fetchProduct(productID))
    console.log(product)
    // console.log({productID})
  }, []);

  return (
    <div>
      ProductDetails
    </div>
  );
}

export default ProductDetails;
