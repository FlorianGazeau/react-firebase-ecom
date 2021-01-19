import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CardProduct from '../../components/CardProduct/CardProduct';
import { fetchProducts } from '../../redux/Products/products.actions';

const MapState = ({productsData}) => ({
  products: productsData.products
})

const Search = () => {

  const dispatch = useDispatch()
  const { products } = useSelector(MapState)
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ filterType }))
    console.log(products)
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value
    setFilterType(nextFilter)
  }

  if (products.length < 1) {
    return (
      <div className='searchPage'>
        <div>
          <select name="" id="" onChange={handleFilter}>
            {/* <option value="">Show All</option> */}
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
          </select>
        </div>
        <h4>No search result</h4>
      </div>
    )
  }
  return (

    <div className='searchPage'>

      <div>
        <select name="" id="" onChange={handleFilter}>
          <option value="">Show All</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
        </select>
      </div>

      {products && products.map((data, i) => {
        const { img, price, name } = data

        const configProduct = {
          img,
          price,
          name
        }

        return (
          <CardProduct key={i} {...configProduct} />
        )
      })}
    </div>
  );
}

export default Search;
