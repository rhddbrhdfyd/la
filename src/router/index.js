import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Event from '@/components/Event.vue';
import Best from '@/components/Best.vue';
import Cody from '@/components/Cody.vue';
import Bestpage from '@/components/BestPage.vue'

const routes = [
  //  아이템 상세 뷰
  {
    path: '/:weatherType(rainy|sunny|cloudy|snowy)',
    component: Cody,
  },
  {
    path: '/best/:bestType(top|bottom|shoes|bag|Accessories)',
    component: Bestpage,
  },
  {
    path: '/event',
    component: Event,
  },
  {
    path: '/best',
    component: Best,
  },
  {
    path: '/',
    component: Home,
  },
  // 잘못된 경로 → 홈으로
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 뒤로가기/앞으로가기일 때 이전 스크롤 위치로 복원
    if (savedPosition) {
      return savedPosition
    }

    // 404 페이지는 무조건 맨 위로
    if (to.name === 'NotFound') {
      return { top: 0 }
    }

    // 기본: 스크롤 위치 초기화
    return { top: 0 }
  }
});

export default router;
