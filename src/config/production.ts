import { ConfigInterface } from '.'

export class Config implements ConfigInterface {
  readonly sentryDSN = ''
  readonly s3Bucket = undefined
  readonly validateReponses = false
  readonly trustProxy = ['loopback', 'uniquelocal']
}
