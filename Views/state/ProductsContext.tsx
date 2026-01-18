import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'

export type Category = 'sehpa' | 'lambader'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: Category
  imageUrl: string
  badge?: string
  stock: number
}

type ProductsContextValue = {
  products: Product[]
  setProducts: (next: Product[]) => void
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined)



export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProductsState] = useState<Product[]>([])

  // Verileri API'den çek
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error('API Hatası')
        const data = await res.json()
        setProductsState(data)
      } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error)
        // Hata durumunda boş liste veya localStorage fallback kullanılabilir
        // Şimdilik boş bırakıyoruz
      }
    }

    fetchProducts()
  }, [])

  const setProducts = (next: Product[]) => {
    setProductsState(next)
    // Gelecekte buraya API update isteği eklenebilir
  }

  const value = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}

