import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../Pages/login/index'
import ProductsDashboard from '../Pages/ProductsDashboard/index'
import PrivateRoute from './PrivateRoute'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/signin" />
        <Route
          element={
            <PrivateRoute>
              <ProductsDashboard />
            </PrivateRoute>
          }
          path="/"
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
