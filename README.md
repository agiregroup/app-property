# 🏠 App Property – Interface de gestion immobilière en Vue 3

Application frontend développée avec Vue 3 et TypeScript. Elle permet de gérer des biens immobiliers (à louer ou à vendre) avec authentification, opérations CRUD, intégration de cartes, gestion d’état centralisée et tests end-to-end automatisés.

---

## 🎯 Objectifs du projet

- Construire une application Vue 3 robuste avec l’API de Composition
- Intégrer une API REST simulée via JSON Server
- Gérer l’état global avec Pinia
- Afficher les localisations sur carte avec Leaflet
- Implémenter des tests end-to-end avec Playwright
- (Bonus) Ajouter des mises à jour en temps réel via WebSocket ou SSE

---

## 🧰 Technologies utilisées

| Catégorie           | Technologie               |
|---------------------|---------------------------|
| Langage             | TypeScript                |
| Framework           | Vue 3 (Composition API)   |
| Gestion d’état      | Pinia                     |
| Routage             | Vue Router 4              |
| Requêtes API        | Axios                     |
| UI / CSS            | TailwindCSS               |
| Outil de build      | Vite                      |
| API simulée         | JSON Server               |
| Tests E2E           | Playwright                |
| Cartographie        | Leaflet (via Vue-Leaflet) |

---


### IDE

- [Visual Studio Code](https://code.visualstudio.com/)
- Extension recommandée : [Vue Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- ⚠️ Désactiver Vetur si installé

### Navigateurs

- Chrome, Edge, Brave (ou tout navigateur basé sur Chromium)
- Extensions utiles :
  - [Vue.js Devtools – Chrome](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Vue.js Devtools – Firefox](https://addons.mozilla.org/fr/firefox/addon/vue-js-devtools/)

---

##  Support TypeScript pour les fichiers `.vue`

TypeScript ne prend pas en charge nativement les types dans les fichiers `.vue`. Pour contourner cela :

- Utilisation de `vue-tsc` pour la vérification des types au lieu de `tsc`
- Extension Volar activée dans l’éditeur pour que le service TypeScript reconnaisse les types `.vue`

---

## Fonctionnalités

- Authentification avec stockage du token
- Liste des biens paginée, triable, filtrable
- Détails d’un bien avec carte interactive
- Formulaire d’ajout de bien
- Notifications toast et indicateurs de chargement
- (Bonus) Mises à jour en temps réel via SSE/WebSocket

---

## Installation et lancement du projet

### 1. Installer les dépendances
```bash
npm install

```
### 2. Lancer l’API simulée (JSON Server)

```bash
npm run mock-api

```
### 3. Démarrer le serveur de développement
```bash
npm run dev

```
### 4. Lancer les tests end-to-end (Playwright)
```bash
npx playwright test
