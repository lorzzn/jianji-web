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
      error
    })

    console.warn({errorList: this.errorList})
    
    if (error instanceof ServiceError && error.message) {
      console.log(error.message);
      
    } else {
      console.error(error)
    }
  }



}

const errorHandler = new ErrorHandler()

export default errorHandler
