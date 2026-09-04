export interface RegisterInput {
  fullName: string
  email: string
  password: string
}

export interface User {
  id: string
  fullName: string
  email: string
}

export interface AuthResponse {
  user: User
  token: string
}

export const getFirstName = (fullName: string): string => {
  if (!fullName) return ''
  return fullName.trim().split(' ')[0]
}
