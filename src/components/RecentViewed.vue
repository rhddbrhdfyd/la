<!-- components/RecentViewed.vue -->
<template>
  <aside class="recent-aside" v-if="showRecent && uniqueRecentViewed.length">
    <div class="recent-header">
      <h4>🕒 최근 본 상품</h4>
      <button class="close-btn" @click="closeRecent">&times;</button>
    </div>
    <ul class="recent-list">
      <li v-for="item in uniqueRecentViewed" :key="item._key" class="recent-item">
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
import { ref, computed, watch, onMounted } from 'vue'
import { recentViewed } from '../stores/recentViewed.js'

const showRecent = ref(true)

function closeRecent() {
  showRecent.value = false
  localStorage.setItem('recentClosedGlobal', '1')
}

// 닫기 상태 로컬스토리지에 저장 후, 상품 클릭하면 다시 열리도록 커스텀 이벤트 처리
onMounted(() => {
  if (localStorage.getItem('recentClosedGlobal') === '1') {
    showRecent.value = false
  }
  window.addEventListener('reopen-recent', () => {
    showRecent.value = true
    localStorage.removeItem('recentClosedGlobal')
  })
})

const uniqueRecentViewed = computed(() => {
  const seen = new Set()
  return recentViewed.value.filter(item => {
    if (seen.has(item._key)) return false
    seen.add(item._key)
    return true
  })
})

watch(recentViewed, () => {
  if (localStorage.getItem('recentClosedGlobal') !== '1') {
    showRecent.value = true
  }
})
</script>

<style scoped>
/* 스타일은 이전과 동일하게 사용 */
.recent-aside {
  position: fixed;
  right: 24px;
  top: 100px;
  width: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px #e5dbb7a8;
  z-index: 100;
  transition: all 0.3s;
  padding-bottom: 16px;
}
.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 12px 16px;
  font-weight: 600;
}
.close-btn {
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  color: #88867a;
}
.recent-list {
  list-style: none;
  margin: 0;
  padding: 12px 16px 0 16px;
  max-height: 400px;
  overflow-y: auto;
}
.recent-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
}
.recent-thumb {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  background: #fff;
  border: 1px solid #f1e1b8;
}
.recent-text {
  flex: 1;
  min-width: 0;
}
.brand {
  color: #3b3b38;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.desc {
  color: #585856;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
