import 'module-alias/register'

const bootstrap = async (): Promise<void> => {
  const app = (await import('./config/app')).default
  app.listen(4000, () => console.log('🌞 New Sun challenge running at http://localhost:4000 🌞'))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
