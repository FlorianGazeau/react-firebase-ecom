import productsTypes from './products.types'

const INITIAL_STATE = {
  queryDoc: '',
  products: [],
  product: [],
  productDetails: [],
  loading: false,
  error: null,
  productsAdmin: [] 
}

const productReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case productsTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        queryDoc: action.payload.queryDoc
      }
    case productsTypes.ADD_NEW_PRODUCTS_BEGIN: 
      return {
        ...state,
      }
    case productsTypes.ADD_NEW_PRODUCTS_SUCCESS:
      return {
        ...state,
        product: action.payload.product
      }
    case productsTypes.DELETE_PRODUCTS_BEGIN: {
      return {
        ...state
      }
    }
    case productsTypes.DELETE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        // products: state.productsAdmin.filter(productsAdmin => productsAdmin.documentID !== action.payload)
        products: state.productsAdmin.filter(function (productsAdmin) { return productsAdmin.documentID === action.payload})
      }
    }
    case productsTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        productDetails: action.payload,
    }
    case productsTypes.FETCH_PRODUCTS_ADMIN_SUCCESS: 
      return {
        ...state,
        productsAdmin: action.payload.data
      }
    default:
      return state;
  }
}

export default productReducer