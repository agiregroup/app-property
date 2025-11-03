<script setup lang="ts">
  defineProps<{
    bien: {
      latitude: number
      longitude: number
    }
  }>()
</script>

<template>
   <div class="space-y-2">
   
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-white">Latitude</label>
        <input v-model="bien.latitude" name="latitude" type="number" placeholder="Latitude"
          class="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-white">Longitude</label>
        <input v-model="bien.longitude" name="longitude" type="number" placeholder="Longitude"
          class="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>
    </div>
  </div>
</template>

