import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { googleProvider } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsub
  }, [])

  const signup = (email, password, name) =>
    createUserWithEmailAndPassword(auth, email, password).then(result =>
      updateProfile(result.user, { displayName: name })
    )

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const loginWithGoogle = () =>
    signInWithPopup(auth, googleProvider)

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, signup, login, loginWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}