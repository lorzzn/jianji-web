import { apiUser } from "@/api/user"
import rootStore from "@/store"
import errorHandler from "@/utils/errorHandler"
import { encryptRSAWithAES } from "@/utils/rsa"

export interface ILoginFormData {
  email: string
  password: string
}

const useLogin = () => {

  const login = async (formData: ILoginFormData) => {
    const publicKey = await rootStore.appStore.getPublicKey()
    if (!publicKey) {
      errorHandler.handle("请求发生错误")
      return
    }

    const params = encryptRSAWithAES(formData, publicKey)
    if (!params) {
      errorHandler.handle("系统发生错误")
      return
    }

    try {
      const res = await apiUser.login(params)
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
