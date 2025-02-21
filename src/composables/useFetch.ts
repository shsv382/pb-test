import { ref } from 'vue'

export function useFetch(url: string) {
  const data = ref<any>(null)
  const loading = ref<boolean>(true)
  const error = ref<any>(null)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
