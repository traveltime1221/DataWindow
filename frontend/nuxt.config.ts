import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      twse: process.env.API_TAIWANSTAT,
      dev: process.env.API_DEV,

    },
    private: { // 私有配置
      thunderforestApiKey: process.env.API_thunderforest_key,
      privateApiKey: '',
    },
  },
  imports: {
    autoImport: true
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/leaflet',
    '@pinia/nuxt',
    'nuxt-3-axios',
    (_options, nuxt) => {// vutify 設定
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    define: {
      'process.env': process.env
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: ['~/assets/scss/app.scss'],
  typescript: {
    typeCheck: true
  },
})
