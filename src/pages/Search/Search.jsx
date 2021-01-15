import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from '../../components/CardProduct/CardProduct';
import { fetchProducts } from '../../redux/Products/products.actions';

const MapState = ({productsData}) => ({
  products: productsData.products
})

const Search = () => {

  const dispatch = useDispatch()
  const { products } = useSelector(MapState)

  useEffect(() => {
    dispatch(fetchProducts())
    console.log(products)
  }, []);


  if (products.length < 1) {
    return (
      <div className='searchPage'>
        <h4>No search result</h4>
      </div>
    )
  }
  return (

    <div className='searchPage'>
      {products && products.map((data, i) => {
        const { img, price, name } = data

        // if (!img || !name) {
        //   return null
        // }

        const configProduct = {
          img,
          price,
          name
        }

        return (
          <CardProduct key={i} {...configProduct} />
        )
      })}
      searchPage
    </div>
  );
}

export default Search;
