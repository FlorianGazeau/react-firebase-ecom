import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from '../../components/CardProduct/CardProduct';
import LoadMore from '../../components/LoadMore/LoadMore';
import { fetchProducts } from '../../redux/Products/products.actions';
import {useSpring, animated} from 'react-spring'

import './Search.css'

const MapState = ({productsData}) => ({
  products: productsData.products
})

const Search = () => {
  const animation = useSpring({opacity: 1, from: {opacity: 0}} )
  const dispatch = useDispatch()
  const [filterType, setFilterType] = useState('');
  const { products } = useSelector(MapState)
  const { data, queryDoc, isLast } = products
  
  useEffect(() => {
    dispatch(fetchProducts({ filterType }))
  }, [filterType, dispatch]);
  
  const handleFilter = (e) => {
    const nextFilter = e.target.value
    setFilterType(nextFilter)
  }
  
  const handleLoadMore = () => {
    dispatch(
      fetchProducts({ 
        filterType, 
        startAfterDoc: queryDoc,
        persitProducts: data   
      })
    )
  }


  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  }

  if (data && data.length < 1) {
    return (
      <div className='searchPage'>
        <div className='wrapper'>
          <div className='select'>
            <select name="slct" id="slct"  onChange={handleFilter}>
              <option value="">Show All</option>
              <option value="mens">Mens</option>
              <option value="womens">Womens</option>
            </select>
          </div>
          <div className='flex-grid'>
            <h2>No search result</h2>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='searchPage'>
      <div className="wrapper">
        <div className='select'>
          <select name="slct" id="slct"  onChange={handleFilter}>
            <option value="">Show All</option>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
          </select>
        </div>
        <animated.div className='flex-grid' style={animation}>
          {data && data.map((data, i) => {
            const { img, price, name, documentID } = data

            const configProduct = {
              img,
              price,
              name, 
              documentID
            }

            return (
              <CardProduct key={i} {...configProduct} />
            )
          })}

        </animated.div>
        {!isLast && (
        <LoadMore {...configLoadMore} />
        )}
      </div>
    </div>
  );
}

export default Search;
