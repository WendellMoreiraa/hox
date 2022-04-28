import axios, { AxiosRequestConfig } from 'axios'

const getSession = () => localStorage.getItem('token')

const api = axios.create({
  baseURL: 'http://localhost:3000'
})
api.interceptors.request.use(async (requestConfig: AxiosRequestConfig) => {
  const configClone = { ...requestConfig }
  const session = getSession()

  configClone.headers = {
    ...configClone.headers,
    authorization: session ? `Bearer ${session}` : ''
  }
  return configClone
})

export default api
