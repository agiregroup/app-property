<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useApiFeedback } from '@/notification/useApiFeedback'


  interface AuthForm {
    email: string
    password: string
  }

  const { call, isLoading } = useApiFeedback()

  const backgroundUrl = new URL('@/assets/img.jpg', import.meta.url).href


  const form = reactive<AuthForm>({
    email: '',
    password: ''
  })

  const router = useRouter()
  const auth = useAuthStore()
  
  async function handleSubmit() {
    try {
      await call(
        () => auth.login(form.email, form.password),
        'Connexion réussie',
        'Echec de la connexion'
      )
      router.push('/properties/location')
    } catch {
      
    }
  }

</script>

<template>
  <div class="w-full h-screen bg-cover bg-center relative" style="background-image: linear-gradient(rgba(0,0,50,0.8),rgba(0,0,50,0.8))">
    <div class="absolute inset-0 z-0">
      <img
        :src="backgroundUrl"
        alt="Filigrane"
        class="w-full h-full object-cover opacity-10 pointer-events-none"
      />
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-10 py-14 max-w-md w-[90%] text-center rounded-lg shadow-lg">
      <h1 class="text-[30px] text-[#3c00a0] mb-14 relative font-bold">
        Connexion
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="bg-[#eaeaea] rounded-md flex items-center overflow-hidden max-h-[65px] transition-all">
          <i class="fa-solid fa-envelope ml-4 text-[#999]"></i>
          <input v-model="form.email" name="email" type="email" placeholder="Adresse e-mail" required class="w-full bg-transparent border-none outline-none px-4 py-4 text-[#999]" />
        </div>

        <div class="bg-[#eaeaea] rounded-md flex items-center overflow-hidden max-h-[65px] transition-all">
          <i class="fa-solid fa-lock ml-4 text-[#999]"></i>
          <input v-model="form.password" name="password" type="password" placeholder="Mot de passe" required class="w-full bg-transparent border-none outline-none px-4 py-4 text-[#999]" />
        </div>

        <p class="text-left text-sm">
          Mot de passe oublié ? <a href="#" class="text-[#3c00a0] hover:underline">Cliquez ici !</a>
        </p>

        <div class="flex justify-center mt-6">
          <button type="submit" class="bg-[#3c00a0] text-white rounded-full h-10 px-6 font-semibold hover:bg-[#2a0075] transition-all"
          :disabled="isLoading">
            Se connecter
          </button>
           
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>