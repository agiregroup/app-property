import { defineStore } from 'pinia'
import {  ref } from 'vue'
import type { Property } from '@/types/propertys'

export const usePropertiesStore = defineStore('properties', () => {
  const toutes = ref<Property[]>([])

  async function charger() {
    if (toutes.value.length > 0) return
    const res = await fetch('http://localhost:3001/properties')
    if (!res.ok) throw new Error('Erreur de chargement')
    const data: Property[] = await res.json()
    toutes.value = data
  }

  function updateProperty(update: Property) {
    const index = toutes.value.findIndex(p => p.id === update.id)
    if (index !== -1) {
      toutes.value[index] = { ...toutes.value[index], ...update }
    }
  }

  function getById(id: number) {
    return toutes.value.find(p => p.id === id)
  }
  
  return { toutes, charger, updateProperty }
})
