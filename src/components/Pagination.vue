<script setup lang="ts">
  const props = defineProps<{
    page: number               
    totalPages: number
  }>()
  
  const emit = defineEmits<{
    (e: 'changer-page', nouvellePage: number): void
  }>()

  
  function changerPage(nouvellePage: number) {
    if (nouvellePage >= 1 && nouvellePage <= props.totalPages) {
      emit('changer-page', nouvellePage)
    }
  }
</script>

<template>
  
  <div class="flex justify-center items-center gap-2 mt-4">
    <button
      @click="changerPage(page - 1)"              
      :disabled="page === 1"                        
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      ◀ Précédent
    </button>

    <!-- Affichage de la page actuelle et du total -->
    <span class="text-sm font-medium">Page {{ page }} / {{ totalPages }}</span>

    <!-- Bouton suivant : désactivé si on est sur la dernière page -->
    <button
      @click="changerPage(page + 1)"               
      :disabled="page === totalPages"              
    >
      Suivant ▶
    </button>
  </div>

</template>

<style scoped>

</style>