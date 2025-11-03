<script setup lang="ts">
  import { onMounted, watch, ref } from 'vue'
  import type { Ref } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  import type { LatLngExpression } from 'leaflet'

  // Props
  const props = defineProps<{
    latitude: number
    longitude: number
  }>()

  // Émission d'événements vers le parent
  const emit = defineEmits<{
    (e: 'update:latitude', value: number): void
    (e: 'update:longitude', value: number): void
  }>()

  // Refs typés
  const map: Ref<L.Map | null> = ref(null)
  const marker: Ref<L.Marker | null> = ref(null)

  onMounted(() => {
    // Vérifie que les coordonnées sont valides
    if (isNaN(props.latitude) || isNaN(props.longitude)) return

    const coords: LatLngExpression = [props.latitude, props.longitude]

    // Initialisation de la carte
    const leafletMap = L.map('map').setView(coords, 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap)

    // Création du marqueur draggable
    const leafletMarker = L.marker(coords, { draggable: true }).addTo(leafletMap)

    // Ajout d'une popup
    leafletMarker.bindPopup('Coordonnées du bien').openPopup()

    // Événement quand le marqueur est déplacé
    leafletMarker.on('dragend', () => {
      const newCoords = leafletMarker.getLatLng()
      emit('update:latitude', newCoords.lat)
      emit('update:longitude', newCoords.lng)
    })

    // Stockage dans les refs
    map.value = leafletMap
    marker.value = leafletMarker
  })

  // Mise à jour dynamique si les props changent
  watch<[number, number]>(
    () => [props.latitude, props.longitude],
    ([lat, lng]) => {
      const coords: LatLngExpression = [lat, lng]
      if (map.value && marker.value) {
        map.value.setView(coords, 13)
        marker.value.setLatLng(coords)
      }
    }
  )

</script>

<template>
  <div class="h-full w-full">
    <div id="map" class="rounded border border-red-50 h-full w-full"
    data-testid="map"></div>
  </div>
</template>
