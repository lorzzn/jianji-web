import { toast } from "react-toastify"
import ServiceError from "./serviceError"
import { code } from "./r/code"
import rootStore from "@/store"

interface IErrorItem {
  date: number
  error: any
  action?: string
  info?: string
}

export class ErrorHandler {

  errorList: IErrorItem[] = []

  handle = (error: any) => {
    this.errorList.push({
      date: Date.now(),
      error
    })

    console.warn({errorList: this.errorList})

    if (error instanceof ServiceError && [
      code.USER_REFRESHTOKEN_FAILED,
      code.JWT_AUTHORIZATION_INVALID
    ].includes(error.response.data.code)) {
      rootStore.userStore.removeToken()
      rootStore.userStore.resetUserInfo()
      window.location.replace("/")
    }
    
    if (error instanceof ServiceError && error.message) {
      toast.error(error.message)
      
    } else {
      console.error(error)
    }
  }


}

const errorHandler = new ErrorHandler()

export default errorHandler
