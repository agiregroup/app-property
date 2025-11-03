<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { useApiFeedback } from '@/notification/useApiFeedback'

  const router = useRouter()
  const { call, isLoading } = useApiFeedback()

  const form = ref({
    nom: '',
    type: 'location',
    proprietaire: '',
    prix: '',
    status: 'disponible',
    latitude: '',
    longitude: ''
  })

  async function ajouterbien() {
    await call(
      async () => {
        await axios.post('http://localhost:3001/properties', form.value)

        setTimeout(() => {
          if (form.value.type === 'location') {
          router.push('/properties/location')
        } else if (form.value.type === 'vente') {
          router.push('/properties/vente')
        }
        }, 500)
      },
      'Bien ajouté avec succès',
      'Erreur lors de l\'ajout du bien'
    )
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <section class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto space-y-6">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white text-center">Ajouter une propriété</h2>

      <form @submit.prevent="ajouterbien" class="grid grid-cols-2 gap-4">
        <!-- Nom -->
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-white mb-1">Nom du bien</label>
          <input
            name="nom"
            v-model="form.nom"
            type="text"
            placeholder="Nom"
            class="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white" required
          />
        </div>

        <!-- Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-white mb-1">Type</label>
          <select
            name="type"
            v-model="form.type"
            class="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="location">Choisir un type</option>
            <option value="location">Location</option>
            <option value="vente">Vente</option>
          </select>
        </div>

        <!-- Statut -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-white mb-1">Status</label>
          <select
            name="status"
            v-model="form.status"
            class="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="choisir le status">Choisir le status</option>
            <option value="disponible">Disponible</option>
            <option value="loué">Loué</option>
            <option value="vendu">Vendu</option>
          </select>
        </div>

        <!-- Prix -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-white mb-1">Prix</label>
          <input
            name="prix"
            v-model="form.prix"
            type="number"
            placeholder="Prix"
            
            class="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white" required
          />
        </div>

        <!-- Propriétaire -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-white mb-1">Propriétaire</label>
          <input
            name="proprietaire"
            v-model="form.proprietaire"
            type="text"
            placeholder="Propriétaire"
            class="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white" required
          />
        </div>

        <!-- Latitude -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-white mb-1">Latitude</label>
          <input
            name="latitude"
            v-model="form.latitude"
            type="text"
            placeholder="Latitude"
            class="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <!-- Longitude -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-white mb-1">Longitude</label>
          <input
            name="longitude"
            v-model="form.longitude"
            type="text"
            placeholder="Longitude"
            class="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <!-- Bouton -->
        <div class="col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-[#3c00a0] text-white px-6 py-2 rounded hover:bg-purple-800 transition disabled:opacity-50"
          >
          <span v-if="isLoading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          <span>{{ isLoading ? 'Ajout en cours...' : 'Ajouter' }}</span>
          </button>
        </div>
      </form>
    </section>
  </div>
  
</template>


<style scoped>

</style>