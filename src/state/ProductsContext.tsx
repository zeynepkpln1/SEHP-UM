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

const initialProducts: Product[] = [
  {
    id: 'coffee-01',
    name: 'Aalto Oval Sehpa',
    description: 'İnce metal ayaklar ve yumuşak ovalliklere sahip, siyah-gold detaylı orta sehpa.',
    price: 6490,
    category: 'sehpa',
    imageUrl: '/images/sehpa/sehpa1.jpg',
    badge: 'Yeni',
    stock: 8,
  },
  {
    id: 'coffee-02',
    name: 'Nord Oak Orta Sehpa',
    description: 'Mat siyah gövde ve doğal meşe yüzeyle lüks showroom hissi veren orta sehpa.',
    price: 7290,
    category: 'sehpa',
    imageUrl: '/images/sehpa/sehpa2.jpg',
    badge: 'En Çok Satan',
    stock: 4,
  },
  {
    id: 'coffee-03',
    name: 'Linea Mermer Sehpa',
    description: 'Gold çizgilerle bölünmüş mermer efektli tabla ve koyu metal ayaklar.',
    price: 9890,
    category: 'sehpa',
    imageUrl: '/images/sehpa/sehpa3.jpg',
    stock: 3,
  },
  {
    id: 'lamp-01',
    name: 'Lumi Arch Lambader',
    description: 'Kavisli siyah gövde ve bej keten şapka ile salon köşelerine heykelsi bir ışık.',
    price: 5590,
    category: 'lambader',
    imageUrl: '/images/lambader/lambader1.jpg',
    badge: 'Sınırlı',
    stock: 6,
  },
  {
    id: 'lamp-02',
    name: 'Oslo Tripod Lambader',
    description: 'Üç ayaklı ahşap tripod gövde ve gold detaylı bağlantılarla dengeli bir siluet.',
    price: 4890,
    category: 'lambader',
    imageUrl: '/images/lambader/lambader2.jpg',
    stock: 10,
  },
  {
    id: 'lamp-03',
    name: 'Nord Soft Glow',
    description: 'Opal cam küre ve ince siyah ayaklarla yumuşak, dağılmış bir aydınlatma.',
    price: 6190,
    category: 'lambader',
    imageUrl: '/images/lambader/lambader3.jpg',
    stock: 5,
  },
]

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

