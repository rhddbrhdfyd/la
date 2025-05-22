<template>
  <section class="favorite-section">
    <div class="card card-weather" v-if="topWeather">
      <h3>💛 자주 선택한 날씨</h3>
      <p><strong>{{ topWeather }}</strong> 날씨에 어울리는 스타일을 추천해드릴게요!</p>
    </div>

    <div class="card card-style" v-if="styles.length">
      <h3>❤️ 관심 스타일</h3>
      <ul class="tag-list">
        <li v-for="(item, idx) in styles" :key="idx"># {{ item }}</li>
      </ul>
    </div>

    <div class="card card-recommend" v-if="message">
      <h3>🧠 나를 위한 추천</h3>
      <p>{{ message }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'

const userId = 'user123'
const favoriteData = ref({})
const weatherStats = ref({})

// 실시간 구독 - favorite
onSnapshot(doc(db, 'favorites', userId), (snap) => {
  favoriteData.value = snap.data() || {}
})

// 실시간 구독 - weatherStats
onSnapshot(doc(db, 'userPreferences', 'weatherStats'), (snap) => {
  weatherStats.value = snap.data() || {}
})

// ✅ 관심 스타일 리스트
const styles = computed(() => {
  return favoriteData.value.favoriteStyle || []
})

// ✅ 최빈값 계산
const topWeather = computed(() => {
  const entries = Object.entries(weatherStats.value || {})
  if (!entries.length) return ''
  const [top] = entries.sort((a, b) => b[1] - a[1])
  return top[0]
})

// ✅ 메시지 생성
const message = computed(() => {
  if (!topWeather.value) return ''
  const hour = new Date().getHours()
  const timeText = hour < 12 ? '아침 산뜻한 스타일'
               : hour < 18 ? '활동적인 데일리룩'
               : '저녁 감성 코디'
  return `${topWeather.value} 날씨에 어울리는 ${timeText} 추천!`
})
</script>



<style scoped>
.favorite-section {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin: 40px auto;
  max-width: 1200px;
  min-height: 200px;
  height: 100%;
}
.card {
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  min-width: 280px;
  max-width: 320px;
  flex: 1 1 300px;
  color: #333;
  transition: transform 0.2s ease;
  height: 200px;
}
.card:hover {
  transform: translateY(-6px);
}
.card h3 {
  font-size: 20px;
  margin-bottom: 12px;
}
.card-weather {
  background: linear-gradient(135deg, #fefcea, #f1da36);
}
.card-style {
  background: linear-gradient(135deg, #fdeef7, #ffcfe5);
}
.card-recommend {
  background: linear-gradient(135deg, #e0fdf4, #b2f4dc);
}
.tag-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tag-list li {
  background: rgba(255, 255, 255, 0.7);
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>
