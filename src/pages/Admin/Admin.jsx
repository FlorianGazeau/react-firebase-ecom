import React, {useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { addNewProduct, fetchProducts } from '../../redux/Products/products.actions'

import Button from '../../components/Form/Button/Button'
import Modal from '../../components/Modal/Modal';
import { FormInput } from '../../components/Form/FormInput/FormInput'
import './Admin.css'
import ManageCardProduct from '../../components/ManageProductCard/ManageProductCard'

const MapState = ({ productsData }) => ({
  products: productsData.products,
  product: productsData.product
})

const Admin = () => {
  const dispatch = useDispatch()
  const { products, product } = useSelector(MapState)
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('mens');
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState(0);
  const [test, setTest] = useState(0)
  const [filterType, setFilterType] = useState([])

  useEffect(() => {
    dispatch(fetchProducts(filterType))
  }, [product, filterType]);

  function handleModal() {
    setShow(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const createDate = new Date()

    dispatch(addNewProduct({
      category, name, img, price, createDate
    }))
  }

  return (
    <div className='container'>
      <div className='admin-nav'>
        <h4 className='admin-title'>List of All Products</h4>
        <Button onClick={handleModal}>
          Add New Product
        </Button>
        <button onClick={() => setTest(test + 1)}>test</button>
      </div>
      <div className='admin-products'>
        {products && products.map((product, index) => {
          const {
            name,
            img,
            price,
            category,
            documentID
          } = product
          return (
            <ManageCardProduct key={index} 
              productName={name}
              productThumbnail={img}
              productPrice={price}
              productCategory={category}
              documentID={documentID}
            />
          )
        })}
      </div>
      <Modal title='Add New Product' onClose={() => setShow(false)} show={show}>
        <form onSubmit={handleSubmit}>
          <select name='Category' onChange={(e) => setCategory(e.target.value)}>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
          </select>
          <FormInput 
            type='text'
            name='name'
            value={name}
            placeholder='Name of product'
            handleChange={(e) => setName(e.target.value)}
          />
          <FormInput 
            type='text'
            name='img'
            value={img}
            placeholder='Image URL'
            handleChange={(e) => setImg(e.target.value)}
          />
          <FormInput 
            type='text'
            name='price'
            value={price}
            placeholder='Price of product'
            handleChange={(e) => setPrice(e.target.value)}
          />
          <Button type='submit'>
            Add Product
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Admin;
