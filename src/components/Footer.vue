<script setup>
import './css/main.css'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isEventPage = computed(() => route.path === '/event')

</script>
<template>
  <footer :class="{ 'event-footer': isEventPage }" id="footer">
    <div class="wrap">
      <!-- 왼쪽 로고 -->
      <div class="footer-left">
        <img :src="isEventPage ? '/img/event-footer-logo.png' : '/img/footer-logo.png'" alt="로고" class="logo" />
      </div>

      <!-- 가운데 텍스트 -->
      <div class="footer-center">
        <p class="site-name">LARA</p>
        <p>© 2025 Team LARA</p>
        <p>Designed & Developed by 경유라, 김민주, 이주영, 이한별</p>
        <p v-if="!isEventPage">
          Uicons by <a href="https://www.flaticon.com/uicons" target="_blank">Flaticon</a>
          · Images by <a href="https://unsplash.com/ko" target="_blank">Unsplash</a>
          · Images by <a href="https://www.freepik.com/" target="_blank">Freepik</a>
        </p>
        <p v-else>저작권표시</p>
      </div>

      <!-- 오른쪽 아이콘 -->
      <div class="footer-right">
        <a href="https://github.com/" target="_blank">
          <img :src="isEventPage ? '/img/svg/event-github.svg' : '/img/github.png'" alt="GitHub 아이콘" class="icon" />
        </a>
        <a href="https://figma.com/" target="_blank">
          <img :src="isEventPage ? '/img/svg/event-figma.svg' : '/img/figma.png'" alt="Figma 아이콘" class="icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

