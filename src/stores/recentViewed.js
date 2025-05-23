// src/stores/recentViewed.js
import { ref } from 'vue'

export const recentViewed = ref([])

export function addRecentItem(product) {
  const existing = recentViewed.value.find(p => p.id === product.id)
  if (!existing) {
    recentViewed.value.unshift(product)
    recentViewed.value = recentViewed.value.slice(0, 5)
    localStorage.setItem('recentViewed', JSON.stringify(recentViewed.value))
  }
}