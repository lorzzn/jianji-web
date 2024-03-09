import { apiUser } from "@/api/user"

export interface ILoginFormData {
  email: string
  password: string
  fingerprint?: string
}

const useLogin = () => {

  const login = (formData: ILoginFormData) => apiUser.login(formData)

  return {
    login,
  }
}

export default useLogin
