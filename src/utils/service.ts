import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BASEURL

const service = axios.create({
  baseURL
})

service.interceptors.response.use((response) => {
  const { data } = response

  
  return Promise.resolve(data)
})

export default service
