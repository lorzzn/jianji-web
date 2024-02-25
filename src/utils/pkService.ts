import axios from "axios"

const baseURL = import.meta.env.VITE_APP_BASEURL

const pkService = axios.create({
  baseURL,
  withCredentials: true
})

export default pkService
