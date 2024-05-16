export class ErrorResponse {
    constructor(
      public jsonrpc: string,
      public code: number,
      public message: string,
      public data: string
    ) {}
  }
  
  export class ErrorResponseWrapper {
    constructor(public error: ErrorResponse) {}
  }