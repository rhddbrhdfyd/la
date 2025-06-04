<script setup>
import './css/main.css'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 현재 라우트 경로 확인
const route = useRoute()
const isEventPage = computed(() => route.path === '/event')

// Vite의 base 경로 자동 반영
const base = import.meta.env.BASE_URL
</script>

<template>
  <footer :class="{ 'event-footer': isEventPage }" id="footer">
    <div class="wrap">
      <!-- 왼쪽 로고 -->
      <div class="footer-left">
        <img
          :src="isEventPage
            ? '/img/event-footer-logo.png'
            : '/img/footer-logo.png'"
          alt="로고"
          class="logo"
        />
      </div>

      <!-- 가운데 텍스트 -->
      <div class="footer-center">
        <p class="site-name">LARA</p>
        <p>© 2025 Team LARA</p>
        <p>Designed & Developed by 경유라, 김민주, 이주영, 이한별</p>
        <p >
          Uicons by <a href="https://www.flaticon.com/uicons" target="_blank">Flaticon</a>
          · Images by <a href="https://unsplash.com/ko" target="_blank">Unsplash</a>
          · Images by <a href="https://www.freepik.com/" target="_blank">Freepik</a>
        </p>
      </div>

      <!-- 오른쪽 아이콘 -->
      <div class="footer-right">
        <a href="https://github.com/yura220/Vue-RaRa.git" target="_blank">
          <img :src="isEventPage ? '/img/svg/event-github.svg' : '/img/github.png'" alt="GitHub 아이콘" class="icon" />
        </a>
        <a href="https://www.figma.com/design/TXBgRvgne3nnz7g7m1VuAO/%EC%9C%BC%EB%9E%8F%EC%B0%A8%EC%B0%A8?node-id=164-26&p=f&t=8swkK6vRZXX4NqIY-0" target="_blank">
          <img :src="isEventPage ? '/img/svg/event-figma.svg' : '/img/figma.png'" alt="Figma 아이콘" class="icon" />
        </a>
      </div>
    </div>
  </footer>
</template>
