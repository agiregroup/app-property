import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import { createPinia } from 'pinia'
// import routeur
import router  from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
const app = createApp(App)



// Connecte le routeur à l'app
app.use(router)
app.use(pinia)
app.use(Toast, {
  toastClassName: (context: { type: string }) => {
    const { type } = context
    const base = 'text-white rounded shadow px-4 py-2'
    const color =
      type === 'success' ? 'bg-blue-600' :
      type === 'error' ? 'bg-red-600' :
      type === 'info' ? 'bg-blue-600' :
      'bg-gray-800'
    return `${base} ${color}`
  },
  bodyClassName: 'text-sm font-medium',
  position: 'top-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
})


app.mount('#app')
