<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const router = useRouter()
  
  const recherche = ref('')

  // Événement vers le parent
  const props = defineProps<{
    biensDisponibles: Array<{ id: number; nom: string }>
  }>()

  const suggestions = computed(() =>
    props.biensDisponibles.filter(bien =>
      bien.nom.toLowerCase().includes(recherche.value.toLowerCase())
    )
    .slice(0, 5)
  )

  const typeActif = computed(() => {
    if (route.name === 'location') return 'Location'
    if (route.name === 'vente') return 'vente'
    return ''
  })

  // Événement vers le parent
  const emit = defineEmits<{
    (e: 'filtrer', payload: { keyword: string; type: string }): void
  }>()

  // Déclenchement automatique à chaque frappe
  watch(recherche, (val) => {
    emit('filtrer', { keyword: val, type: typeActif.value })
  })

  // Sélection d’une suggestion
  function choisirSuggestion(nom: string) {
    recherche.value = nom
    emit('filtrer', { keyword: nom, type: typeActif.value })
  }

</script>

<template>
  
  <div class="flex items-center mb-6 gap-2 max-w-xs mt-4 mx-auto">
    <!-- Barre de recherche-->
    <div class="relative w-full max-w-md">
      <i class="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-[#3c00a0] text-sm"></i>
      <input
        type="text"
        v-model="recherche"
        placeholder="Rechercher un bien..."
        class="w-full px-3 pl-8 py-1 border rounded-full text-sm placeholder:text-xs "
      />
      <ul
        v-if="recherche.length > 0 && suggestions.length > 0"
        class="absolute z-10 bg-white border rounded w-full mt-1 shadow text-sm"
      >
        <li v-if="suggestions.length === 0" class="px-4 py-2 texte-gray-500">
          Aucun bien trouvé
        </li>
        <li
          v-for="bien in suggestions"
          :key="bien.id"
          @click="router.push(`/properties/${bien.id}`)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ bien.nom }}
        </li>
      </ul>

    </div>
  </div>

</template>

<style scoped>

</style>