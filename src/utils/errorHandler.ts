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
    console.log(error)
  }



}

const errorHandler = new ErrorHandler()

export default errorHandler
