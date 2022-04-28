export function userSignIn(name: String, email: String, token: String, signIn: Boolean) {
  return {
    type: 'SIGN_IN',
    payload: {
      name,
      email,
      token,
      signIn
    }
  }
}
