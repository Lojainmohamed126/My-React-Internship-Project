import type { User } from 'firebase/auth'

export type AuthMode = 'login' | 'register'

export type AuthContextValue = {
  user: User | null
  authLoading: boolean
  logout: () => Promise<void>
}
