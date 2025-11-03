
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/auth'

// Import des pages ici
import PageAuth from "@/pages/PageAuth.vue";
import PageProperties from "@/pages/PageProperties.vue";
import Sale from "@/components/Sale.vue";
import AjouterBien from "@/components/AjouterBien.vue";
import Location from "@/components/Location.vue";
import PageVoirDetails from "@/pages/PageVoirDetails.vue";


// Definir les routes
const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Connexion',
    component: PageAuth
  },
  
  {
    path: '/properties',
    component: PageProperties,
    
    children: [
      {
        path: '',
        redirect: {name: 'location'}
      },

      {
        path: 'location',
        name: 'location',
        component: Location
      },

      {
        path: 'vente',
        name: 'vente',
        component: Sale
      },
      
      {
        path: 'ajouter',
        name: 'ajouter',
        component: AjouterBien
      }
    ]
  },
  
  {
    path: '/properties/:id',
    name: 'property-details',
    component: PageVoirDetails
  }
  
]

// On crée le routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Empêche accès sans connexion
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const token = localStorage.getItem('token')

  // Recharge le token dans le store si besoin (utile après un refresh)
  if (token && !auth.token) {
    auth.token = token
    const user = localStorage.getItem('user')
    if (user) auth.user = JSON.parse(user)
  }

  // Si la route est protégée et qu'on n'est pas connecté, on redirige
  if (to.meta.requiresAuth && !auth.token) {
    return next('/login')
  }

  next()
})


export default router