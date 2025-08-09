export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = async (url: string, options: any = {}) => {
    const method = options.method?.toUpperCase() || 'GET'
    options.credentials = 'include'

    // Attach token if available
    if (process.client) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }
    }

    // Only fetch CSRF cookie for mutating requests (except login)
    const isMutating = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
    const isLoginRoute = url.includes('/login')

    if (isMutating && !isLoginRoute) {
      await $fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
        credentials: 'include'
      })
    }

    return $fetch(`${config.public.apiBase}${url}`, options)
  }

  return {
    provide: {
      api
    }
  }
})
