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

export function setRefresh(productsChange: boolean) {
  return {
    type: 'SET_REFRESH',
    payload: {
      productsChange
    }
  }
}
