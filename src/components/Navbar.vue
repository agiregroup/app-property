<script setup lang="ts">
   import { useRouter } from 'vue-router';
   import { useAuthStore } from '@/stores/auth';
   import { computed } from 'vue';

   const router = useRouter()
   const auth = useAuthStore()

   const userEmail = computed(() => auth.user?.email || 'Utilisateur')

   function logout() {
      auth.logout()
      router.push('/login')
   }
</script>

<template>
   <nav class="bg-gray-800 text-white px-4 md:px-4 py-4">
      <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
         
         <!-- Logo -->
         <div class="w-full md:w-auto">
            <router-link to="/" class="text-xl font-bold text-white">App-property</router-link>
         </div>

         <!-- Email + bouton -->
         <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto md:ml-auto">
            <span class="text-sm text-white">{{ userEmail }}</span>
            <button @click="logout" class="bg-[#3c00a0] text-white px-3 py-1 rounded hover:bg-[#2a0075] text-sm">
            Déconnexion
            </button>
         </div>

      </div>
   </nav>

</template>

<style scoped>

</style>