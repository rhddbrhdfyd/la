<script setup>
import Sidebar from './components/Sidebar.vue'
import HeaderNav from './components/HeaderNav.vue'
import RecentViewed from './components/RecentViewed.vue' // ✅ 올바른 경로
import Footer from './components/Footer.vue'
</script>

<template>
  <Sidebar />
  <HeaderNav />
  <router-view :key="$route.fullPath" />
  <RecentViewed />
  <Footer></Footer>
</template>

