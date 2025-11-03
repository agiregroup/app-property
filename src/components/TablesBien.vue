<script setup lang="ts">
  
const props = defineProps<{
  biens: Array<{
    id: number
    nom:string
    proprietaire: string
    type: 'location' | 'vente'
    prix: number
    status: 'disponible' | 'vendu' | 'loué'
  }>
}>()


</script>

<template>
  <div class="relative overflow-x-auto max-w-4xl mx-auto ">
    
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="px-6 py-3">Nom du bien</th>
          <th class="px-6 py-3">Propriétaire</th>
          <th class="px-6 py-3">Prix (FCFA)</th>
          <th class="px-6 py-3" >Type</th>
          <th class="px-6 py-3">Statut</th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      
      <tbody>
        <tr
          v-for="bien in biens"
          :key="bien.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ bien.nom }}
          </td>

          <td class="px-6 py-4">{{ bien.proprietaire }}</td>
          <td class="px-6 py-4">{{ bien.prix }}</td>
          <td class="px-6 py-4">{{ bien.type }}</td>
          <td class="px-6 py-4">
            <span
              :class="{
                'text-green-600': bien.status === 'disponible',
                'text-red-500': bien.status !== 'disponible'
              }"
              class="font-semibold"
            >
              {{ bien.status }}
            </span>
          </td>  
          <td class="px-6 py-4">
            <router-link
              :to="`/properties/${bien.id}`"
              class="text-blue-600 hover:underline text-sm"
            >
              Voir détails
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
      <!--<div class="text-green-600 text-sm">
        {{ biens.length }} biens reçus dans le tableau
      </div>-->
  </div>
</template>

<style scoped>

</style>