import productsTypes from './products.types'

const INITIAL_STATE = {
  products: [],
  product: [],
  loading: false,
  error: null
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
        products: action.payload.products
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
        products: state.products.filter(products => products.documentID !== action.payload)
      }
    }
    default:
      return state;
  }
}

export default productReducer