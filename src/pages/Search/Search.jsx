import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from '../../components/CardProduct/CardProduct';
import LoadMore from '../../components/LoadMore/LoadMore';
import { fetchProducts } from '../../redux/Products/products.actions';

const MapState = ({productsData}) => ({
  products: productsData.products
})

const Search = () => {

  const dispatch = useDispatch()
  const [filterType, setFilterType] = useState('');
  const { products } = useSelector(MapState)
  const { data, queryDoc } = products
  
  useEffect(() => {
    dispatch(fetchProducts({ filterType }))
  }, [filterType]);
  
  const handleFilter = (e) => {
    const nextFilter = e.target.value
    setFilterType(nextFilter)
  }
  
  const handleLoadMore = () => {
    console.log(queryDoc)
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
      <div className='result'>
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

      </div>
      <LoadMore {...configLoadMore} />
    </div>
  );
}

export default Search;