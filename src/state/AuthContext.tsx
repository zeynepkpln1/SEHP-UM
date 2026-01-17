import {
  createContext,
  useContext,
  useState,
} from 'react'
import type { ReactNode } from 'react'

type User = {
  email: string
}

type Admin = {
  email: string
}

type AuthContextValue = {
  user: User | null
  admin: Admin | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  adminLogin: (email: string, password: string) => Promise<boolean>
  adminLogout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const USER_KEY = 'nordic:user'
const ADMIN_KEY = 'nordic:admin'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const stored = localStorage.getItem(ADMIN_KEY)
    return stored ? JSON.parse(stored) : null
  })

  // useEffect ile sync kaldırmaya gerek kalmadı ama state değişimlerini dinleyebiliriz
  // veya sadece yukarıdaki lazy initialization yeterli.

  const login = async (email: string, password: string) => {
    if (!email || !password) return false
    const nextUser = { email }
    setUser(nextUser)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))

    // Kullanıcı modu aktifken admin oturumunu kapat
    setAdmin(null)
    localStorage.removeItem(ADMIN_KEY)

    return true
  }

  const register = async (email: string, password: string) => {
    if (!email || !password) return false
    const nextUser = { email }
    setUser(nextUser)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))

    // Yeni kullanıcı oluşturulurken admin oturumunu temizle
    setAdmin(null)
    localStorage.removeItem(ADMIN_KEY)

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_KEY)
  }

  const adminLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        const nextAdmin = { email }
        setAdmin(nextAdmin)
        localStorage.setItem(ADMIN_KEY, JSON.stringify(nextAdmin))

        // Admin modu aktifken olası müşteri oturumunu kapat
        setUser(null)
        localStorage.removeItem(USER_KEY)

        return true
      }
    } catch (error) {
      console.error('Giriş hatası:', error)
    }
    return false
  }

  const adminLogout = () => {
    setAdmin(null)
    localStorage.removeItem(ADMIN_KEY)
  }

  return (
    <AuthContext.Provider
      value={{ user, admin, login, register, logout, adminLogin, adminLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

