import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import type { Product } from './ProductsContext'

export type CartItem = {
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('nordic:cart')
    if (stored) {
      try {
        return JSON.parse(stored) as CartItem[]
      } catch {
        return []
      }
    }
    return []
  })

  const persist = (updater: (prev: CartItem[]) => CartItem[]) => {
    setItems(prev => {
      const next = updater(prev)
      localStorage.setItem('nordic:cart', JSON.stringify(next))
      return next
    })
  }

  const addToCart = (product: Product) => {
    persist(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    persist(prev => prev.filter(i => i.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    persist(prev =>
      prev.map(i =>
        i.product.id === productId ? { ...i, quantity } : i,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem('nordic:cart')
  }

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  )

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

