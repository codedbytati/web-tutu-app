import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
  type UserCredential
} from 'firebase/auth'
import type { AuthGateway, RegisterInput } from '@tutu-domain/auth/AuthGateway'
import { auth, googleProvider } from '@tutu-services/firebase'

export class FirebaseAuthGateway implements AuthGateway {
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async register({
    fullName,
    email,
    password
  }: RegisterInput): Promise<UserCredential> {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    await updateProfile(credential.user, { displayName: fullName })
    return credential
  }

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(auth, googleProvider)
  }

  logout(): Promise<void> {
    return signOut(auth)
  }

  subscribe(listener: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, listener)
  }
}

export const authGateway = new FirebaseAuthGateway()
