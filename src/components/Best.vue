<script setup>
import BestDesktop from './BestDesktop.vue';
import BestMobile from './BestMobile.vue';
import { computed } from 'vue'

const isMobile = computed(() => window.innerWidth <= 768)
</script>

<template>
  <BestMobile v-if="isMobile" />
  <BestDesktop v-else />
</template>
