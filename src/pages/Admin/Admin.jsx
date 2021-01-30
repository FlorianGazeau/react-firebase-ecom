import React, {useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { addNewProduct, fetchProductsAdmin } from '../../redux/Products/products.actions'

import Button from '../../components/Form/Button/Button'
import Modal from '../../components/Modal/Modal';
import { FormInput } from '../../components/Form/FormInput/FormInput'
import './Admin.css'
import ManageCardProduct from '../../components/ManageProductCard/ManageProductCard'

const MapState = ({ productsData }) => ({
  products: productsData.products,
  product: productsData.product,
  productAdmin: productsData.productsAdmin
})

const Admin = () => {
  const dispatch = useDispatch()
  const { products, product, productAdmin } = useSelector(MapState)
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('mens');
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState(0);
  const [test, setTest] = useState(0)
  const [filterType, setFilterType] = useState([])
  const {data} = productAdmin

  useEffect(() => {
    dispatch(fetchProductsAdmin())
  }, [product]);

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
    <div className='wrapper'>
      <div className='admin-nav'>
        <h4 className='admin-title'>List of All Products</h4>
        <Button onClick={handleModal} className='btn btn-add'>
          Add New Product
        </Button>
      </div>
      <div className='flex-grid'>
        {data && data.map((product, index) => {
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
          <div className="select">
            <select name='Category' onChange={(e) => setCategory(e.target.value)}>
              <option value="mens">Mens</option>
              <option value="womens">Womens</option>
            </select>
          </div>
          <FormInput 
            type='text'
            name='name'
            value={name}
            placeholder='Name of product'
            handleChange={(e) => setName(e.target.value)}
            className='form-input'
          />
          <FormInput 
            type='text'
            name='img'
            value={img}
            placeholder='Image URL'
            handleChange={(e) => setImg(e.target.value)}
            className='form-input'
          />
          <FormInput 
            type='text'
            name='price'
            value={price}
            placeholder='Price of product'
            handleChange={(e) => setPrice(e.target.value)}
            className='form-input'
          />
          <Button type='submit' className='btn btn-submit'>
            Add Product
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Admin;
