import { createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {persistStore} from 'redux-persist'
import rootReducer from './rootReducer'

export const middleware = [thunk, logger]

export const store = createStore(rootReducer, applyMiddleware(...middleware))

export const persistor = persistStore(store)

const Store = {
  store,
  persistor
}

export default Store