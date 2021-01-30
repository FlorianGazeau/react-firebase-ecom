import productsTypes from './products.types'
import { firestore } from '../../Firebase/utils'
import { bindActionCreators } from 'redux'

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


export function fetchProducts({ filterType, startAfterDoc, persitProducts=[] }) {

  return dispatch => { 
    dispatch(fetchProductsBegin)

    return new Promise((resolve, reject) => {

      const pageSize = 12
      let ref = firestore.collection('products').orderBy('createDate').limit(pageSize)

      if (filterType) { ref = ref.where('category', '==', filterType) }
      if (startAfterDoc) { ref = ref.startAfter(startAfterDoc) }
        ref
        .get()
        .then(snapshot => {
          const totalCount = snapshot.size

          const data = [
            ...persitProducts,
            ...snapshot.docs.map(doc => {
              return {
                ...doc.data(),
                documentID: doc.id
              }
            })
          ]
          resolve({
            data,
            queryDoc: snapshot.docs[totalCount - 1],
            isLast: totalCount < 1
          })
          dispatch(fetchProductsSuccess({data, queryDoc: snapshot.docs[totalCount - 1]}))
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

export const fetchProductsSuccess = data => ({
  type: productsTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { data }
});

export const fetchProductsError = () => ({

})


export const fetchProduct = ({productID}) => {
  return dispatch => {
    dispatch(fetchProductBegin)
    return new Promise((resolve, reject) => {
      firestore
      .collection('products')
      .doc(productID)
      .get()
      .then(snapshot => {
        if (snapshot.exist) {
          resolve()
        }
        dispatch(fetchProductSuccess(snapshot.data()))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

export const fetchProductBegin = () => ({
  type: productsTypes.FETCH_PRODUCT_BEGIN
})

export const fetchProductSuccess = (product) => ({
  type: productsTypes.FETCH_PRODUCT_SUCCESS,
  payload: product 
})


// GOOD NOW

export function fetchProductsAdmin() {
  return dispatch => {
    dispatch(fetchProductsAdminBegin)

    return new Promise((resolve, reject) => {
      firestore
      .collection('products')
      .get()
      .then(snapshot => {
        const productsArray = snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        resolve()
        dispatch(fetchProductsAdminSuccess(productsArray))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

export const fetchProductsAdminBegin = () => ({
  type: productsTypes.FETCH_PRODUCTS_ADMIN_BEGIN
})

export const fetchProductsAdminSuccess = products => ({
  type: productsTypes.FETCH_PRODUCTS_ADMIN_SUCCESS,
  payload: {products }
})

export const fetchProductsAdminFailure = errors => ({
  type: productsTypes.FETCH_PRODUCTS_ADMIN_FAILURE,
  payload: { errors }
})

export function deleteProduct({documentID}) {
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
  payload: {documentID} 
})

export const deleteProductFailure = (errors) => ({
  type: productsTypes.DELETE_PRODUCTS_FAILURE,
  payload: { errors }
})