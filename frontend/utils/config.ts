import { useRuntimeConfig } from '#app';

export function getConfig() {
  const config = useRuntimeConfig()
  return {
    api_twse: config.public.twse,
    api_dev: config.public.dev,
    // 預留
    apiUrl: config.public.apiUrl,
    apiKey: config.public.apiKey,
  }
}
