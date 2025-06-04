// stores/recentViewed.js
import { ref } from 'vue'

// 전역 반응형 배열: 최근 본 상품 리스트
export const recentViewed = ref([])

/**
 * 최근 본 상품을 추가하는 함수
 * @param {Object} param0
 *  - id: 상품 id
 *  - name: 상품 이름
 *  - image: 상품 이미지 전체 경로
 *  - brand: 브랜드명
 *  - desc: 상품 설명
 *  - routeKey: 상품이 등록된 경로 구분값(예: best, rainy 등)
 */
export function addToRecentViewed({ id, name, image, brand, desc, routeKey }) {
  // 각 상품별 고유키(같은 상품이 여러 번 안 뜨도록)
  const _key = `${id}-${routeKey}`

  // 최종 저장될 상품 객체
  const productWithImage = { id, name, image, brand, desc, _key }

  // 1. 기존 localStorage에서 데이터 읽기
  let list = JSON.parse(localStorage.getItem('recentViewed') || '[]')
  // 2. 이미 있으면 제거
  list = list.filter(item => item._key !== _key)
  // 3. 맨 앞에 추가
  list.unshift(productWithImage)
  // 4. 10개 제한
  if (list.length > 10) list = list.slice(0, 10)
  // 5. 저장
  localStorage.setItem('recentViewed', JSON.stringify(list))
  // 6. 전역 상태 업데이트
  recentViewed.value = list
}

// 앱 시작 시 로컬스토리지에서 불러옴
const initList = JSON.parse(localStorage.getItem('recentViewed') || '[]')
recentViewed.value = initList
