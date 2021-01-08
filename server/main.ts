import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import nuxtConfig from '~/nuxt.config'
import buildNuxt from './nuxt.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const nuxt = await buildNuxt(nuxtConfig)
  app.use(nuxt)

  await app.listen(3001)
}
bootstrap()
