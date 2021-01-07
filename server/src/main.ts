import { NestFactory } from '@nestjs/core';
import { Nuxt, build } from 'nuxt';
import { AppModule } from './app.module';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nuxtConfig = require('../../client/nuxt.config.js');

nuxtConfig.rootDir = join(process.cwd(), '/../client');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Check if we need to run Nuxt in development mode
  const env = process.env.NODE_ENV || 'production';
  const isDev = env !== 'production';

  console.log(`MODE: ${env}`);

  // Get a ready to use Nuxt instance
  const nuxt = new Nuxt(
    Object.assign(nuxtConfig, {
      dev: isDev,
    }),
  ); //await loadNuxt(isDev ? 'dev' : 'start');

  // Enable live build & reloading on dev
  if (isDev) {
    await build(nuxt);
  } else {
    await nuxt.ready();
  }

  app.use(nuxt.render);

  await app.listen(3001);
}
bootstrap();
