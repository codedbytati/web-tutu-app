export type RegisterInput = {
  fullName: string
  email: string
  password: string
}

export type User = {
  id: string
  fullName: string
  email: string
}

export type AuthResponse = {
  user: User
  token: string
}

export const getFirstName = (fullName: string): string => {
  if (!fullName) return ''
  return fullName.trim().split(' ')[0]
}
