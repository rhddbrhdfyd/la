<script setup>
import './css/bestMobile.css'
import { useRouter, useRoute } from 'vue-router'
import { bestMap } from './js/bestDataMap.js'
import { ref, computed, watchEffect } from 'vue'

const router = useRouter()
const route = useRoute()

const selectedType = ref('top')  // 문자열 key 사용
const activeImage = ref('')
const activeColorName = ref('')

const currentItem = computed(() => {
  return bestMap[selectedType.value] || {}
})

watchEffect(() => {
  const bestType = route.params.bestType
  if (bestMap[bestType]) {
    selectedType.value = bestType
  } else {
    router.replace('/best/top')
  }
})

watchEffect(() => {
  const current = currentItem.value
  if (current?.main?.colors?.[0]) {
    activeImage.value = current.main.colors[0].image
    activeColorName.value = current.main.colors[0].name
  }
})

function goTo(type) {
  router.push(`/best/${type}`)
}

</script>

<template>
<div v-if="currentItem && currentItem.main">
  <section id="bestP">
    <div class="m-wrap">
      <!-- 큰 이미지 -->
      <div class="main-img">
        <img :src="activeImage" :alt="activeColorName" />
      </div>
      <div class="p-top">
        <h3>{{ currentItem.main.brand }}</h3>
        <p>{{ currentItem.main.name }}</p>
        <p class="m-desc">{{ currentItem.main.desc }}</p>
      <!-- 썸네일 목록 -->
        <div class="c-thumbs">
          <div
            v-for="color in currentItem.main.colors"
            :key="color.id"
            class="thumb-block"
          >
            <img
              :src="color.image"
              :alt="color.name"
              class="thumb"
              @click="activeImage = color.image; activeColorName = color.name"
            />
          </div>
        </div>
        <p>{{ currentItem.main.price }}</p>
      </div>

      <div class="c-btns">
        <button class="c-btn c-btn1" @click="goTo('/404-error')">장바구니</button>
        <button class="c-btn c-btn2" @click="goTo('/404-error')">구매하기</button>
      </div>
    </div>
  </section>

  <section id="bestB">
    <!-- 관련 상품 텍스트 정보 -->
    <div class="p-bottom m-wrap">
      <div class="r-items">
        <div
          v-for="rel in currentItem.related"
          :key="rel.id"
          class="r-info"
        >
          <div class="r-box">
            <img :src="rel.image" :alt="rel.name" @click="goTo('/404-error')" />
          </div>
          <p>{{ rel.brand }}</p>
          <p>{{ rel.name }}</p>
          <p>{{ rel.price }}</p>
          <div class="r-btns">
            <button class="c-btn c-btn1" @click="goTo('/404-error')">장바구니</button>
            <button class="c-btn c-btn2" @click="goTo('/404-error')">구매하기</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
