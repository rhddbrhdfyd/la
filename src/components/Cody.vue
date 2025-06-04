<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CodyList from './CodyList.vue'
import CodyMobile from './CodyMobile.vue'

const isMobile = ref(window.innerWidth <= 768)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <CodyMobile v-if="isMobile" />
  <CodyList v-else />
</template>
