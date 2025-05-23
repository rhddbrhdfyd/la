<template>
  <aside class="recent-aside" v-if="recentViewed.length">
    <h4>🕒 방금 본 상품</h4>
    <ul class="recent-list">
      <li v-for="item in recentViewed" :key="item._key" class="recent-item">
        <img :src="item.image" :alt="item.desc" class="recent-thumb" />
        <div class="recent-text">
          <p class="brand">{{ item.brand }}</p>
          <p class="desc">{{ item.desc }}</p>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { onMounted } from 'vue'
import { recentViewed } from '../stores/recentViewed.js'

onMounted(() => {
  const stored = localStorage.getItem('recentViewed')
  if (stored) {
    recentViewed.value = JSON.parse(stored)
  }
})
</script>


<style scoped>
.recent-aside {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 240px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.recent-aside h4 {
  margin-bottom: 10px;
  font-size: 16px;
}
.recent-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.recent-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.recent-thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
}
.recent-text {
  font-size: 13px;
}
.brand {
  font-weight: bold;
}
.desc {
  color: #555;
}
</style>