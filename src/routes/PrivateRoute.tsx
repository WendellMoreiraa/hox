import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StatesProps } from '../Helpers/types/states'

export default function PrivateRoute({ children }: any) {
  const { token, signIn } = useSelector((state: StatesProps) => state.user)
  const auth = token && signIn
  return auth ? <div>{children}</div> : <Navigate to="/signin" />
}
