/* eslint-disable default-param-last */
const INITIAL_STATE = {
  name: '',
  email: '',
  token: localStorage.getItem('token') || '',
  signIn: !!localStorage.getItem('token')
}

export default function user(state = INITIAL_STATE, action: any) {
  console.log(action)
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
