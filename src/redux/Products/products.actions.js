import productsTypes from './products.types'
import { firestore } from '../../Firebase/utils'

export function addNewProduct(product) {
  return dispatch => {
    dispatch(addNewProductStart)

    return new Promise((resolve, reject) => {
      firestore
        .collection('products')
        .doc()
        .set(product)
        .then(() => {
          resolve()
          dispatch(addNewProductSuccess({product}))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const addNewProductStart = () => ({
  type: productsTypes.ADD_NEW_PRODUCTS_BEGIN
})

export const addNewProductSuccess = (product) => ({
  type: productsTypes.ADD_NEW_PRODUCTS_SUCCESS,
  payload: product
})


export function fetchProducts({ filterType }) {

  return dispatch => { 
    dispatch(fetchProductsBegin)

    return new Promise((resolve, reject) => {

      let ref = firestore.collection('products').orderBy('createDate')

      if (filterType) {
        ref = ref.where('category', '==', filterType)
      } 
        ref
        .get()
        .then(snapshot => {
          const productsArray = snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
          resolve(productsArray)
          dispatch(fetchProductsSuccess(productsArray))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const fetchProductsBegin = (filters={}) => ({
  type: productsTypes.FETCH_PRODUCTS_BEGIN,
  payload: filters
})

export const fetchProductsSuccess = products => ({
  type: productsTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsError = () => ({

})


export function deleteProduct({documentID}) {
  console.log(documentID)
  return dispatch => { 
    dispatch(deleteProductBegin)

    return new Promise((resolve, reject) => {
      firestore
        .collection('products')
        .doc(documentID)
        .delete()
        .then(() => {
          resolve()
          dispatch(deleteProductSuccess(documentID ))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const deleteProductBegin = () => ({
  type: productsTypes.DELETE_PRODUCTS_BEGIN
})

export const deleteProductSuccess = (documentID) => ({
  type: productsTypes.DELETE_PRODUCTS_SUCCESS,
  payload: documentID
})