<script setup lang="ts">
  import axios from 'axios';
  import type { Property } from '@/types/propertys';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { useApiFeedback } from '@/notification/useApiFeedback';

  const { call, isLoading } = useApiFeedback()
  const props = defineProps<{
    bien: Property
  }>()

  const emit = defineEmits<{
    (e: 'saved'): void
  }>()

  const route = useRoute()
  const successMessage = ref('')
  const errorMessage = ref('')

  const loading = ref(false)
  const handleSubmit = async () => {
      if (!props.bien.proprietaire || props.bien.prix <= 0 || !props.bien.status) {
      return
    }

    await call(
      async () => {
        await axios.put(`http://localhost:3001/properties/${props.bien.id}`, props.bien)
        emit('saved')
      },
      'Bien modifié avec succès',
      'Echec de la modifucation'
    )

  }

</script>

<template>
  <div class=" ">
    <section class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 max-w-2xl mx-auto ">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6 flex justify-center">
      Modifier
    </h2>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Propriétaire -->
      <div class="sm:col-span-2">
        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Propriétaire</label>
        <input
          v-model="bien.proprietaire"
          type="text"
          class="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <!-- Prix -->
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Prix</label>
        <input
          v-model="bien.prix"
          type="number"
          class="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
        />
      </div>

      <!-- Statut -->
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Statut</label>
        <select
          v-model="bien.status"
          class="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
        >
          <option value="disponible">Disponible</option>
          <option value="loué">Loué</option>
          <option value="vendu">Vendu</option>
        </select>
      </div>

      <!-- Bouton Enregistrer -->
      <div class="sm:col-span-2 flex justify-center">
        <button
          type="submit"
          :disabled="isLoading"
          class="bg-[#3c00a0] text-white px-6 py-2 rounded hover:bg-[#2a0075] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
        <span v-if="isLoading">Modification en cours...</span>
        <span v-else>Enregistrer</span>
        </button>
      </div>
    </form>
    </section>
</div>
</template>



