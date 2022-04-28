/* eslint-disable default-param-last */

const INITIAL_STATE = {
  products: [],
  loading: false,
  totalProducts: 0
}

export default function products(state = INITIAL_STATE, action: any) {
  console.log(action)
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }

    default:
      return state
  }
}
