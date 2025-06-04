// src/firebase.js

// Firebase App 초기화
import { initializeApp } from 'firebase/app'
// Firestore 가져오기
import { getFirestore } from 'firebase/firestore'

// Firebase 설정 객체
const firebaseConfig = {
  apiKey: "AIzaSyDWpwcFIn4GOl-b7_ak2WBCuswTrFiNWb4",
  authDomain: "lara-8412a.firebaseapp.com",
  projectId: "lara-8412a",
  storageBucket: "lara-8412a.appspot.com",
  messagingSenderId: "1023113583442",
  appId: "1:1023113583442:web:ab9939c2ed62028d5d788b"
}

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig)

// Firestore DB 연결 객체 생성
const db = getFirestore(firebaseApp)

// 필요한 것들 export
export { firebaseApp, db }
