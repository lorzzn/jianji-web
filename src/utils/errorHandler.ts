import { AxiosError, HttpStatusCode } from "axios"
import { eq } from "lodash"
import { toast } from "react-toastify"
import eventBus, { events } from "./eventBus"
import { code } from "./r/code"
import ServiceError from "./serviceError"

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
      error,
    })

    console.warn({ errorList: this.errorList })

    // 弹出后端报错消息
    if (error instanceof ServiceError && error.message) {
      toast.error(error.message)

      if (error.response.data.code === code.USER_REFRESHTOKEN_FAILED) {
        eventBus.emit(events.userAuthorizationExpired)
      }
    } else {
      console.error(error)
    }

    // 后端服务器错误
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.InternalServerError &&
      !eq(window.location.pathname, "/500")
    ) {
      window.location.href = "/500"
    }
  }
}

const errorHandler = new ErrorHandler()

export default errorHandler
