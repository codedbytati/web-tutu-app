import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  type UserCredential
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'

// Cadastro com E-mail, Senha e Nome
export const registerWithEmail = async (
  name: string,
  email: string,
  pass: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name })
  }
  return userCredential
}

export const loginWithEmail = async (
  email: string,
  pass: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, pass)
}

export const loginWithGoogle = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, googleProvider)
}

export const logoutUser = async (): Promise<void> => {
  return await signOut(auth)
}
