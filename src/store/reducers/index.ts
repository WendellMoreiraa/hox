import { combineReducers } from 'redux'

import user from './user'
import products from './produtcs'

export default combineReducers({
  user,
  products
})
