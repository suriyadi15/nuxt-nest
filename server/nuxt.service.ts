import { Nuxt, build } from 'nuxt'

export default async function buildNuxt(nuxtConfig: any) {
  const nuxt = new Nuxt(nuxtConfig)

  if (nuxtConfig.dev) {
    await build(nuxt)
  } else {
    await nuxt.ready()
  }

  return nuxt.render
}
