import { defineStore } from "pinia";
import axios from 'axios'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),

  actions: {
    // Fonction de connexion appelée depuis le formulaire
    async login(email: string, password: string) {
      try {
        // Envoie une requête GET à json-server pour chercher un utilisateur
       // dont l'email ET le mot de passe correspondent
        const response = await axios.get('http://localhost:3001/users', {
          params: { email, password }
        })

        // Récupère le premier utilisateur trouvé dans le tableau
        const user = response.data[0]

        // Si aucun utilisateur trouvé, on déclenche une erreur
        if (!user) {
          throw new Error('échec de connexion')
        }

        // Simule un token fictif à partir de l'id
        this.token = 'fake-token' + user.id

        // Stocke les infos de l'utilisateur dans le store Pinia
        this.user = { id: user.id, email: user.email }

        // Sauvegarde le token et l'utilisateur dans le localStorage
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (error) {
        // En cas d'erreur réseau ou utilisateur non trouvé
      throw new Error('échec de la connexion')
      }
    },

    // efface le token du store et du localStorage
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },

  getters: {
      isAuthenticated: (state) => !!state.token
    }
})