import React from 'react'
import { Route, Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }: any) {
  const auth = false
  return auth ? <Route element={children} /> : <Navigate to="/signin" />
}
