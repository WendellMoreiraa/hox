/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutIcon from '@mui/icons-material/Logout'
import { makeStyles } from '@mui/styles'
import { ProductProps } from '../../Helpers/types/products'
import * as productsActions from '../../store/actions/products'
import TableData from '../../components/TableDashboard'
import ButtonAdd from '../../components/AddProducts'

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
  addProducts: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
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
  const [products, setProducts] = useState<ProductProps[]>([])
  const dispach = useDispatch()
  const dashboard = useStyles()
  const signiOut = () => {
    localStorage.removeItem('token')
  }

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products')
      dispach(productsActions.setProducts(response.data, response.data.length))

      setProducts(response.data)
      dispach(productsActions.setLoading(false))
    }
    dispach(productsActions.setLoading(true))
    loadProducts()
  }, [dispach])

  return (
    <div className={dashboard.bodyDashboard}>
      <header className={dashboard.headerDashboard}>
        <div>
          <img src={Menu} alt="menulogo" />
        </div>
        <div className={dashboard.asideIcons}>
          <div className={dashboard.logo}>
            <LogoutIcon onClick={signiOut} sx={{ color: '#ffff', fontSize: '25px' }} />
            <h3>Sign out</h3>
          </div>
          <div className={dashboard.logo}>
            <AccountCircleRoundedIcon sx={{ color: '#ffff', fontSize: '25px' }} />
            <h3>Perfil</h3>
          </div>
        </div>
      </header>
      <div className={dashboard.mainDashboard}>
        <div className={dashboard.addProducts}>
          <ButtonAdd />
        </div>

        <section>
          <TableData products={products} />
        </section>
      </div>
    </div>
  )
}

export default ProductsDashboard
