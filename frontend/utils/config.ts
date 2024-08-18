import { useRuntimeConfig } from '#app';

export function getConfig() {
  const config = useRuntimeConfig()
  return {
    api_twse: config.public.twse,
    api_dev: config.public.dev,
    api_thunderforest_key: config.private.thunderforestApiKey,
    // 預留
    apiUrl: config.public.apiUrl,
    apiKey: config.public.apiKey,
  }
}
