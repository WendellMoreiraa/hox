/* eslint-disable default-param-last */
const INITIAL_STATE = {
  name: '',
  email: '',
  token: localStorage.getItem('token') || '',
  signIn: !!localStorage.getItem('token')
}
interface ActionProps {
  type: string
  payload: any
}

export default function user(state = INITIAL_STATE, action: ActionProps) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        signIn: action.payload.signIn
      }

    default:
      return state
  }
}
