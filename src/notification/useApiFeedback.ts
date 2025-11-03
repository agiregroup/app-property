import { ref } from 'vue'
import { useNotifier } from './useNotifier'

export function useApiFeedback() {
  const isLoading = ref(false)
  const notify = useNotifier()

  async function call(apiFn: () => Promise<any>, succesMsg = '', errorMsg = '') {
    try {
      isLoading.value = true
      const result = await apiFn()
      notify.success(succesMsg)
      return result
    } catch (err: any) {
      notify.error(errorMsg + (err?.message ? ` : ${err.message}` : ''))
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return { call, isLoading }
}
