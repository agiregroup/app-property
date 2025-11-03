import { defineStore } from "pinia";
import { ref, computed } from "vue"

export const usePaginationStore = defineStore('pagination', () => {
  const pageActuelle = ref(1)
  const biensParPage = ref(10)
  const totalBiens = ref(0)

  const nombreDePages = computed(() =>
    Math.max(1, Math.ceil(totalBiens.value / biensParPage.value))
  )

  function changerPage(nouvellePage: number) {
    if (nouvellePage >= 1 && nouvellePage <= nombreDePages.value) {
      console.log('Chargement vers la page', nouvellePage)
      pageActuelle.value = nouvellePage
    }
  }

  function mettreAjourTotal(nouveauTotal: number) {
    totalBiens.value = nouveauTotal
  }

  return {
    pageActuelle,
    biensParPage,
    nombreDePages,
    changerPage,
    mettreAjourTotal,
  }
})