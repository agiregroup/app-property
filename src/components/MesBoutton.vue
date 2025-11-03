<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

    function navigateTo(page: string) {
      router.push(`/properties/${page}`)
    }

  function buttonClass(page: string) {
    const isActive = route.path.includes(page)
    return [
      'px-4 py-1 rounded font-medium transition text-white',
      isActive ? 'bg-[#3c00a0]' : 'bg-purple-300 hover:bg-gray-500'
    ].join(' ')
  }

</script>

<template>
  <div class="flex gap-4 justify-center mb-6 ">
    <button
      @click="navigateTo('location')"
      :class="buttonClass('location')"
    >
      Biens en location
    </button>

    <button
      @click="navigateTo('vente')"
      :class="buttonClass('vente')"
    >
      Biens en vente
    </button>

    <button
      @click="navigateTo('ajouter')"
      :class="buttonClass('ajouter')"
    >
      Ajouter un bien
    </button>
  </div>
  <!--<p class="text-sm text-gray-500">Route actuelle : {{ route.path }}</p>-->

</template>

<style scoped>

</style>