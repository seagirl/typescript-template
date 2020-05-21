export interface ConfigInterface {
  readonly sentryDSN: string;
  readonly s3Bucket?: string;
}

let config: ConfigInterface

export const loadConfig = async (): Promise<ConfigInterface> => {
  if (config != null) {
    return Promise.resolve(config)
  }

  const env = process.env.NODE_ENV ?? 'local'
  const module = await import(`./${env}`)
  config = new module['Config']()

  return config
}