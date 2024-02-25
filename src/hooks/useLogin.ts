import { apiUser } from "@/api/user"
import errorHandler from "@/utils/errorHandler"

export interface ILoginFormData {
  email: string
  password: string
}

const useLogin = () => {

  const login = async (formData: ILoginFormData) => {
    try {
      const res = await apiUser.login(formData)
      console.log(res)
      
    } catch (error) {
      errorHandler.handle(error)
    }
    
  }


  return {
    login,
  }
}

export default useLogin
