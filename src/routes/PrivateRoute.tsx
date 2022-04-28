import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ children }: any) {
  const { token, signIn } = useSelector((state: any) => state.user)
  const auth = token && signIn
  console.log(auth, token, signIn)
  return auth ? <div>{children}</div> : <Navigate to="/signin" />
}
