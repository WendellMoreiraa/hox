export function setProducts(products: [], totalProducts: number) {
  return {
    type: 'SET_PRODUCTS',
    payload: {
      products,
      totalProducts
    }
  }
}
export function setLoading(loading: boolean) {
  return {
    type: 'SET_LOADING',
    payload: {
      loading
    }
  }
}
