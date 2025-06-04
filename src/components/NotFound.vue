<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

function goBackOrHome() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
<template>
  <div class="notfound n-box">
    <picture>
      <source srcset="/img/m-404.png" media="(max-width: 768px)" />
      <img src="/img/404.png" alt="404 Not Found" class="n-image" />
    </picture>
    <a class="n-back" @click="goBackOrHome"></a>
  </div>
</template>

<style scoped>
.notfound{position: relative;}

.n-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  display: block;
}

.notfound .n-back{
  position: absolute;
  display: block;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  width: 400px;
  top: 70%;
  height: 250px;
}

@media (max-width: 480px) {
  .n-image {
    width: 100%;
  }

  .notfound .n-back{
  top: 75%;
  width: 300px;
  height: 150px;
}
}
</style>