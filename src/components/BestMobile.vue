<script setup>
import './css/bestMobile.css'
import { useRouter, useRoute } from 'vue-router'
import { bestMap } from './js/bestDataMap.js'
import { ref, computed, watchEffect } from 'vue'

const router = useRouter()
const route = useRoute()

const selectedIndex = ref(0)
const activeImage = ref('')
const activeColorName = ref('')

const currentItem = computed(() => bestMap[selectedIndex.value])

watchEffect(() => {
  const bestType = route.params.bestType
  const found = Object.entries(bestMap).find(([_, value]) => value.type === bestType)
  selectedIndex.value = found ? Number(found[0]) : 0
})

watchEffect(() => {
  const current = bestMap[selectedIndex.value]
  if (current?.main?.colors?.length) {
    activeImage.value = current.main.colors[0].image
    activeColorName.value = current.main.colors[0].name
  }
})

function goTo(type) {
  router.push(`/best/${type}`)
}
</script>


<template>
  <section id="bestM">
    <div class="m-wrap">
      <h2>Let us recommend<br/>your kind of day.</h2>
      <div class="b-box">
        <img src="/img/Look-m.png" alt="추천코디">
      </div>
      <ul>
        <li>
          <a @click="goTo('top')">
            <p>상의</p>
          </a>
        </li>
        <li>
          <a @click="goTo('bottom')">
            <p>하의</p>
            </a>
          </li>
        <li>
          <a @click="goTo('bag')">
            <p>가방</p>
          </a>
          </li>
        <li>
          <a @click="goTo('Accessories')">
            <p>악세사리</p>
          </a>
          </li>
        <li>
          <a @click="goTo('shoes')">
            <p>신발</p>
          </a>
          </li>
          <li></li>
      </ul>
    </div>
  </section>
</template>