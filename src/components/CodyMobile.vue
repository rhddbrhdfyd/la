<script setup>
import { useRoute, useRouter } from 'vue-router'
import { weatherMap } from './js/weatherDataMap.js'
import { recentViewed } from '../stores/recentViewed.js'
import { ref, onMounted, nextTick, computed } from 'vue'
import './css/CodyMobile.css'

const route = useRoute()
const router = useRouter()
const base = import.meta.env.BASE_URL

const weatherType = route.params.weatherType || 'rainy'
const weatherData = weatherMap[weatherType]

const codys = weatherData.cody
const items = weatherData.items
const detailImages = weatherData.detail || []
const slide = weatherData.slide

function handleProductClick(product) {
  const viewed = JSON.parse(localStorage.getItem('recentViewed')) || []

  const fullImage =
    product.image.startsWith('http') ? product.image : base + product.image

  const productWithFullImage = {
    ...product,
    image: fullImage,
    _key: `${product.id}-${weatherType}`
  }

  viewed.unshift(productWithFullImage)
  const unique = Array.from(new Map(viewed.map(p => [p._key, p])).values())
  const sliced = unique.slice(0, 5)

  localStorage.setItem('recentViewed', JSON.stringify(sliced))
  recentViewed.value = sliced
}

const itemList = ref([])
const swiperRef = ref()
const showSwiper = ref(false)

onMounted(() => {
  itemList.value = weatherMap[weatherType]?.items || []
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      showSwiper.value = true
    })
  })
})

const groupedItems = computed(() => {
  const groups = []
  for (let i = 0; i < itemList.value.length; i += 2) {
    groups.push(itemList.value.slice(i, i + 2))
  }
  return groups
})

const groupedSlide = computed(() => {
  const groups = []
  for (let i = 0; i < slide.length; i += 2) {
    groups.push(slide.slice(i, i + 2))
  }
  return groups
})

const weatherTypeLabel = {
  rainy: '비 오는 날',
  sunny: '화창한 날',
  snowy: '눈 오는 날',
  cloudy: '흐린 날'
}[weatherType]

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <section id="cody">
    <div class="m-wrap">
      <div class="cody-list">
        <div
          v-for="cody in codys"
          :key="cody.id"
          class="s-card"
        >
          <!-- 코디 이미지 -->
          <div class="c-img-box">
            <img :src="cody.image" alt="" class="c-image" />
          </div>
          <p class="cody-desc">{{ cody.desc }}</p>

          <!-- 해당 코디에 속한 아이템 리스트 -->
          <div class="d-card">
            <ul class="d-lists">
              <li
                v-for="item in items.filter(i => i.group === cody.group)"
                :key="item.id"
                class="d-list"
              >
                <div class="d-thumb-box">
                  <img
                    :src="item.image"
                    :alt="item.brand + ' 제품 이미지'"
                    class="d-thumb"
                    @click="goTo('/404-error')"
                  />
                </div>
                <div class="d-text" @click="goTo('/404-error')">
                  <strong>{{ item.brand }}</strong>
                  <p>{{ item.desc }}</p>
                  <div class="dot-box">
                    <span
                      class="color-dot"
                      :style="{ backgroundColor: item.colorCode }"
                    ></span>
                    <p>{{ item.color }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="cody-right" :class="['page', 'theme', weatherType]">
        <h3 class="a-title">날씨 따라 즐기는 하루</h3>
        <ul class="a-lists">
          <li
            v-for="(a, i) in weatherData.activities"
            :key="i"
            class="a-list"
          >
            <h4>{{ a.title }}</h4>
            <p>{{ a.desc }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
