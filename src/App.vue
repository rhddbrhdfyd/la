<script setup>
import Sidebar from './components/Sidebar.vue'
import HeaderNav from './components/HeaderNav.vue'
import Footer from './components/Footer.vue'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import RecentViewed from './components/RecentViewed.vue'

const isSideOpen = ref(false)
const isMobile = ref(window.innerWidth <= 767)

function handleResize() {
  isMobile.value = window.innerWidth <= 767
  isSideOpen.value = !isMobile.value  // 데스크탑이면 열기, 모바일이면 닫기
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()  // 최초 1회 실행
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <Sidebar :isMobile="isMobile" :isSideOpen="isSideOpen" />
  <HeaderNav
    :isMobile="isMobile"
    :isSideOpen="isSideOpen"
    @toggleSide="isSideOpen = !isSideOpen"
  />
  <router-view :key="$route.fullPath" />
  <RecentViewed />
  <Footer />
</template>
