import Application from './app'

const app = new Application()

const startServer = async (): Promise<void> => {
  await app.init()
  app.start()
}

startServer()
