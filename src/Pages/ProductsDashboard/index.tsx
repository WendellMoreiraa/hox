import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutIcon from '@mui/icons-material/Logout'
import { makeStyles } from '@mui/styles'

import { StatesProps } from '../../Helpers/types/states'
import * as productsActions from '../../store/actions/products'
import TableData from '../../components/TableDashboard'

import Menu from '../../img/Menu.png'
import api from '../../services/api'

const useStyles = makeStyles({
  bodyDashboard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  headerDashboard: {
    width: '100%',
    height: '100px',
    display: 'flex',
    padding: '5px 20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(166, 229, 169, 1)'
  },
  mainDashboard: {
    padding: '20px'
  },

  asideIcons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffff',
    fontSize: '12px',
    padding: '6px',
    '&:first-child': {
      marginRight: '10px'
    },
    '&:Hover': {
      backgroundColor: 'rgba(118, 189, 122, 1)',
      cursor: 'pointer'
    }
  }
})

function ProductsDashboard() {
  const dispach = useDispatch()
  const { productsChange, products } = useSelector((state: StatesProps) => state.products)
  const dashboard = useStyles()
  const signiOut = () => {
    localStorage.removeItem('token')
    dispach(productsActions.setRefresh(true))
  }

  const loadProducts = useCallback(async () => {
    const response = await api.get('/products')
    dispach(productsActions.setProducts(response.data, response.data.length))

    dispach(productsActions.setLoading(false))
  }, [dispach])

  const refreshProducts = useCallback(() => {
    loadProducts()
    dispach(productsActions.setRefresh(false))
  }, [dispach, loadProducts])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    if (productsChange) {
      refreshProducts()
    }
  }, [productsChange, refreshProducts])

  return (
    <div className={dashboard.bodyDashboard}>
      <header className={dashboard.headerDashboard}>
        <div>
          <img src={Menu} alt="menulogo" />
        </div>
        <div className={dashboard.asideIcons}>
          <div className={dashboard.logo}>
            <LogoutIcon sx={{ color: '#ffff', fontSize: '25px' }} onClick={signiOut} />
            <h3>Sign out</h3>
          </div>
          <div className={dashboard.logo}>
            <AccountCircleRoundedIcon sx={{ color: '#ffff', fontSize: '25px' }} />
            <h3>Perfil</h3>
          </div>
        </div>
      </header>
      <div className={dashboard.mainDashboard}>
        <section>{products && <TableData products={products} />}</section>
      </div>
    </div>
  )
}

export default ProductsDashboard
