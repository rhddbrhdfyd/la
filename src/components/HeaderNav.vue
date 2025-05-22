<script setup>
import './css/header.css'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// GitHub Pages 대응을 위한 base 경로
const base = import.meta.env.BASE_URL

const route = useRoute()

// 정확히 "/event"일 때만 이벤트 페이지로 판단
const isEventPage = computed(() => route.path === '/event')
</script>

<template>
  <header :class="['header', { 'event-header': isEventPage }]" id="header">
    <div class="wrap flex">
      <div class="nav-right">
        <img
          :src="isEventPage ? base + 'img/event-my.png' : base + 'img/my.png'"
          alt="유저 아이콘"
          class="icon"
        />
        <img
          :src="isEventPage ? base + 'img/event-bag.png' : base + 'img/bag.png'"
          alt="장바구니"
          class="icon"
        />
        <img
          :src="isEventPage ? base + 'img/event-hamburger.png' : base + 'img/hamburger.png'"
          alt="햄버거 아이콘"
          class="icon"
        />
      </div>
    </div>
  </header>
</template>
