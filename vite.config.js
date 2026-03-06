{
  urlPattern: /^https:\/\/openrouter\.ai\/api\/.*/i,
  handler: 'NetworkFirst', // ✅ FIXED
  options: {
    cacheName: 'api-calls',
    networkTimeoutSeconds: 15,
    expiration: {
      maxEntries: 50,
      maxAgeSeconds: 60 * 60 * 24 // 1 day
    },
    cacheableResponse: {
      statuses: [0, 200]
    }
  }
}
