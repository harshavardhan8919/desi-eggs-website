import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCBiVS1OI6D_Bk4ELoQ3h0Bu1Uydxn3vuc",
  authDomain: "desi-eggs-website.firebaseapp.com",
  projectId: "desi-eggs-website",
  storageBucket: "desi-eggs-website.firebasestorage.app",
  messagingSenderId: "28592456553",
  appId: "1:28592456553:web:12c3292b4ea498bae9f3f8"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)