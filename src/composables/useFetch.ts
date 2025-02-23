import { ref } from 'vue'

export function useFetch(url: string, options={}) {
  const data = ref<any>(null)
  const loading = ref<boolean>(true)
  const error = ref<any>(null)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url, options)
      const value = await response.json()
      if (value.error) {
        error.value = value.error
      } else {
        data.value = value
      }
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
