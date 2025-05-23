<template>
  <section id="detail">
    <div class="wrap">
      <div class="d-row">
        <div
          class="group-card"
          v-for="cody in codys"
          :key="cody.id"
        >
          <img
            :src="cody.image"
            alt="코디 대표 이미지"
            class="s-image"
          />

          <!-- 하단 아이템 리스트 (해당 그룹에 속한 아이템들) -->
          <div class="d-card">
            <ul class="d-lists">
              <li
                v-for="item in items.filter(i => i.group === cody.group)"
                :key="item.id + '-' + weatherType"
                class="d-list"
                @click="handleProductClick(item)"
                style="cursor: pointer"
              >
                <img :src="item.image" alt="아이템 이미지" class="d-thumb" />
                <div class="d-text">
                  <strong>{{ item.brand }}</strong><br />
                  {{ item.desc }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { weatherMap } from './js/weatherDataMap.js';
import { recentViewed } from '../stores/recentViewed.js'
import './css/codyDetail.css';

const route = useRoute();
const base = import.meta.env.BASE_URL;

const weatherType = route.params.weatherType;
const weatherData = weatherMap[weatherType];

const codys = weatherData.cody;
const items = weatherData.items;

function handleProductClick(product) {
  const viewed = JSON.parse(localStorage.getItem('recentViewed')) || []

  const productWithFullImage = {
    ...product,
    image: product.image.startsWith('http') ? product.image : base + product.image,
    _key: `${product.id}-${weatherType}`
  }

  viewed.unshift(productWithFullImage)
  const unique = Array.from(new Map(viewed.map(p => [p._key, p])).values())
  const sliced = unique.slice(0, 5)
  localStorage.setItem('recentViewed', JSON.stringify(sliced))
  recentViewed.value = sliced
}
</script>
