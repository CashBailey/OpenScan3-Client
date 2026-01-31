import { createClient } from 'src/generated/api/client'
import { useApiConfigStore } from 'src/stores/apiConfig'

// WARNING: Import-time side effects and global mutable state.
// This module accesses localStorage and initializes the Pinia store during import,
// which can cause issues with SSR (where localStorage doesn't exist) and tests.
// Consider deferring store initialization or wrapping in try-catch if used in SSR environments.
const apiConfigStore = useApiConfigStore()

try {
  apiConfigStore.loadFromStorage()
} catch (error) {
  console.warn('Failed to load API config from storage during module initialization:', error)
}

export const apiClient = createClient()

export function updateApiClientConfig() {
  apiClient.setConfig({
    baseUrl: apiConfigStore.baseURL,
    responseStyle: 'data'
  })
}

updateApiClientConfig()

export function getApiBaseUrl() {
  return apiConfigStore.baseURL
}
