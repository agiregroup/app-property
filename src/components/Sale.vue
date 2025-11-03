<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import { usePropertiesStore } from '@/stores/usePropertiesStore'
  import { usePaginationStore } from '@/stores/usePaginationStore'
  import type { Property } from '@/types/propertys'

  import TablesBien from './TablesBien.vue'
  import BarreRecherche from './BarreRecherche.vue'
  import Pagination from './Pagination.vue'
  import MesBoutton from './MesBoutton.vue'

  const store = usePropertiesStore()
  const pagination = usePaginationStore()
  const biensFiltres = ref<Property[]>([])

  onMounted(async () => {
    await store.charger()
    biensFiltres.value = store.toutes.filter((bien: Property) => bien.type?.toLowerCase() === 'vente')
    pagination.mettreAjourTotal(biensFiltres.value.length)
    console.log('Exemple de bien :', JSON.parse(JSON.stringify(store.toutes[0])))
  })
  function filtrerBiens(payload: { keyword: string; type: string }) {
    biensFiltres.value = store.toutes
      .filter(bien => bien.type.toLowerCase() === payload.type.toLowerCase())
      .filter(bien => bien.nom.toLowerCase().includes(payload.keyword.toLowerCase()))
    pagination.mettreAjourTotal(biensFiltres.value.length)
    pagination.changerPage(1)
  }

  const biensAffiches = computed(() =>
    biensFiltres.value.slice(
      (pagination.pageActuelle - 1) * pagination.biensParPage,
      pagination.pageActuelle * pagination.biensParPage
    ),
    
  )
</script>

<template>
  <div class="flex flex-col gap-4 px-4">
    <!-- Barre de recherche en haut -->
    <BarreRecherche :biensDisponibles="biensFiltres" @filtrer="filtrerBiens"/>

    <MesBoutton/>

    <!-- Message si aucun bien -->
    <div v-if="biensAffiches.length === 0" class="text-center text-sm text-gray-500 my-4">
      Aucun bien trouvé pour cette recherche.
    </div>

   <!-- Tableau -->
    <TablesBien :biens="biensAffiches" titre="Biens en vente" />

    <!-- Pagination -->
   <Pagination
       :page="pagination.pageActuelle"
       :totalPages="pagination.nombreDePages" @changer-page="pagination.changerPage"
     />

    <p class="text-sm text-gray-600 text-center mt-2">
      Page {{ pagination.pageActuelle }} sur {{ pagination.nombreDePages }}
    </p>
  </div>

     <!--<div v-if="store.toutes.length > 0" class="text-green-600 text-sm">
  {{ store.toutes.length }} biens chargés depuis l’API
</div>-->
</template>

<style scoped>

</style>