export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class ItemNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ItemNotFoundError'
  }
}

export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AlreadyExistsError'
  }
}
