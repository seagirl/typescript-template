export interface ConfigInterface {
  readonly sentryDSN: string;
  readonly s3Bucket?: string;
  readonly validateReponses: boolean;
  readonly trustProxy?: string[];
}

let config: ConfigInterface

export const loadConfig = async (): Promise<ConfigInterface> => {
  if (config != null) {
    return Promise.resolve(config)
  }

  const env = process.env.NODE_ENV ?? 'local'
  const module = await import(`./${env}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  config = new module['Config']()

  return config
}