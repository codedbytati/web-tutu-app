import type { User, UserCredential } from 'firebase/auth'

export type RegisterInput = {
  fullName: string
  email: string
  password: string
}

export interface AuthGateway {
  login(email: string, password: string): Promise<UserCredential>
  register(input: RegisterInput): Promise<UserCredential>
  loginWithGoogle(): Promise<UserCredential>
  logout(): Promise<void>
  subscribe(listener: (user: User | null) => void): () => void
}
