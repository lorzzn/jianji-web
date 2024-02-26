import { apiUser } from "@/api/user"
import errorHandler from "@/utils/errorHandler"

export interface ILoginFormData {
  email: string
  password: string
}

const useLogin = () => {

  const login = async (formData: ILoginFormData) => {
    try {
      return Promise.resolve(await apiUser.login(formData))
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    }
  }

  return {
    login,
  }
}

export default useLogin
