import axios from "axios"

const baseURL = import.meta.env.VITE_APP_BASEURL

const pureService = axios.create({
  baseURL,
})

export default pureService
