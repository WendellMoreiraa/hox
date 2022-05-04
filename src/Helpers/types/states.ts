import { ProductProps } from './products'

export interface StateProductsProps {
  products: ProductProps[]
  loading: boolean
  totalProducts: number
  productsChange: boolean
}

export interface StatesProps {
  user: any
  products: StateProductsProps
}
