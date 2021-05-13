enum Status {
  Success = 'success',
  Failure = 'failure',
  Warning = 'warning',
}



interface Result {
  status: Status,
  msg?: string,
  data?: any
}


export { Status, Result }