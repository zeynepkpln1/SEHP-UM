import { useParams } from 'react-router-dom'
import { useProducts } from '../state/ProductsContext'
import { ProductCard } from '../components/products/ProductCard'

export function ShopPage() {
  const { kategori } = useParams()
  const { products } = useProducts()

  const filtered =
    kategori === 'sehpa' || kategori === 'lambader'
      ? products.filter(p => p.category === kategori)
      : products

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">KOLEKSİYON</div>
          <h1 className="page-title">
            {kategori === 'sehpa'
              ? 'Sehpa Koleksiyonu'
              : kategori === 'lambader'
                ? 'Lambader Koleksiyonu'
                : 'Tüm Ürünler'}
          </h1>
        </div>
        <p className="page-subtitle">
          İnce düşünülmüş oranlar, yumuşak köşeler ve doğal malzemelerle mekânınıza sakin bir ritim
          katın.
        </p>
      </div>

      <div className="grid grid-3">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

