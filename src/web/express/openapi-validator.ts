import { OpenApiRequestHandler } from 'express-openapi-validator/dist/framework/types'
import { loadConfig } from '../../config'

export class OpenAPIValidator {
  constructor (public apiSpecPath: string) {
  }

  async middleware (): Promise<OpenApiRequestHandler[]> {
    const config = await loadConfig()
    const validator = await import('express-openapi-validator')
    return validator.middleware({
      apiSpec: this.apiSpecPath,
      validateRequests: true,
      validateResponses: config.validateReponses
    })
  }
}
