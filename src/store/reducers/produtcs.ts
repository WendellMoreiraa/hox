/* eslint-disable default-param-last */
const INITIAL_STATE = {
  products: [],
  loading: false,
  totalProducts: 0,
  productsChange: false
}

interface ActionProps {
  type: string
  payload: any
}

export default function products(state = INITIAL_STATE, action: ActionProps) {
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
    case 'SET_REFRESH':
      return {
        ...state,
        productsChange: action.payload.productsChange
      }

    default:
      return state
  }
}
