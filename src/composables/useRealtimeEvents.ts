import { usePropertiesStore } from '@/stores/usePropertiesStore'
import { useToast } from 'vue-toastification'

export function useRealtimeEvents() {
  const store = usePropertiesStore()
  const toast = useToast()

  const eventSource = new EventSource('http://localhost:3001/api/events')

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      store.updateProperty(data)
      console.log('Connexion SSE établie')
      toast.success('Statut de la propriété mis à jour en temps réel.')
    } catch (err) {
      console.error('Erreur de parsing SSE :', err)
      toast.error('Connexion SSE interrompue.')
    }
    
  }

}
