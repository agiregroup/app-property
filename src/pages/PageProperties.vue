<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed, onMounted } from 'vue';
  
  import Navbar from '@/components/Navbar.vue';
import { useRealtimeEvents } from '@/composables/useRealtimeEvents';

  onMounted(() => {
    useRealtimeEvents
  })
  const route = useRoute()

  const afficherPagination = computed(() => 
    route.name === 'location' || route.name === 'vente'
  )


</script>

<template>
  <header>
     <navbar/>
  </header>

  <main>
   <router-view />
  </main>
</template>

<style scoped>

</style>