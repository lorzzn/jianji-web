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

    if (error instanceof ServiceError && error.message) {
      toast.error(error.message)

      if (error.response.data.code === code.USER_REFRESHTOKEN_FAILED) {
        eventBus.emit(events.userAuthorizationExpired)
      }
    } else {
      console.error(error)
    }
  }
}

const errorHandler = new ErrorHandler()

export default errorHandler
