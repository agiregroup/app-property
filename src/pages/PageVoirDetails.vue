<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'

  import type { Property } from '@/types/propertys'


  import BienForm from '@/components/BienForm.vue'
  import CoordonneesForm from '@/components/CoordonneesForm.vue'
  import BienMap from '@/components/BienMap.vue'
  

  const showSuccessMessage = () => {
    console.log('Bien enregistré avec succès')
  }
  const route = useRoute()
  const bien = ref<Property | null>(null)
  

  onMounted(async () => {
    const res = await axios.get(`http://localhost:3001/properties/${route.params.id}`)
    bien.value = res.data
  })

</script>

<template>
  <div v-if="bien" class="px-4 py-6 bg-gray-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Bloc gauche : Formulaire -->
      <section class="bg-gray-50 rounded-xl shadow p-6 flex flex-col space-y-4">
        <BienForm :bien="bien" @saved="showSuccessMessage" />
      </section>

      <!-- Bloc droite : Détails + Coordonnées -->
      <div class="flex flex-col space-y-4">
        <!-- Détails du bien -->
        <section class="bg-gray-50 rounded-xl shadow p-6 space-y-2">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Détails du bien</h2>
          <p><strong>Nom :</strong> {{ bien.nom }}</p>
          <p><strong>Propriétaire :</strong> {{ bien.proprietaire }}</p>
          <p><strong>Type :</strong> {{ bien.type }}</p>
          <p><strong>Prix :</strong> {{ bien.prix.toLocaleString() }} FCFA</p>
          <p><strong>Status :</strong> {{ bien.status }}</p>
        </section>

        <!-- Coordonnées géographiques -->
        <section class="bg-gray-50 rounded-xl shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Coordonnées géographiques</h2>
          <CoordonneesForm :bien="bien" />
        </section>
      </div>
    </div>

    <!-- Bloc carte en dessous -->
    <div class="mt-6">
     <section class="bg-white rounded-xl shadow p-6 w-full h-96 flex flex-col">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Localisation</h2>
        <BienMap
          class="h-full w-full"
          :latitude="bien.latitude"
          :longitude="bien.longitude"
          @update:latitude="bien.latitude = $event"
          @update:longitude="bien.longitude = $event"
        />
      </section>
    </div>
    </div>
  </div>

</template>

