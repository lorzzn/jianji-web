

class ServiceError extends Error {
  constructor(message: any) {
    super(message)
    this.name = 'ServiceError'
  }

}

export default ServiceError
