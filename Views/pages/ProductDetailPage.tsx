import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../state/ProductsContext'
import { useCart } from '../state/CartContext'
import { useAuth } from '../state/AuthContext'

export function ProductDetailPage() {
  const { productId } = useParams()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const { admin } = useAuth()

  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="page">
        <div className="card-elevated">
          <p style={{ margin: 0, fontSize: '0.96rem' }}>Ürün bulunamadı.</p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Lütfen koleksiyondan geçerli bir ürün seçin.
          </p>
          <Link to="/koleksiyon/sehpa" style={{ marginTop: '1rem', display: 'inline-block' }}>
            <button className="btn">Koleksiyona Dön <span>↗</span></button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">
            {product.category === 'sehpa' ? 'SEHPA' : 'LAMBADER'} DETAYI
          </div>
          <h1 className="page-title">{product.name}</h1>
        </div>
        <p className="page-subtitle">
          Siyah, gold ve bej tonlarının dengesiyle tasarlanan bu parça; lüks showroom atmosferini
          yaşam alanınıza taşıyacak şekilde düşünülmüştür.
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card-elevated">
          <div
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              background: '#141217',
              aspectRatio: '4 / 3',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="card-soft">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.8rem',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {product.category === 'sehpa' ? 'Sehpa' : 'Lambader'}
            </span>
            {product.badge && (
              <div className="badge">
                <span className="badge-dot" />
                {product.badge}
              </div>
            )}
          </div>

          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.1rem',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'var(--text-muted)',
                }}
              >
                Fiyat
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                {product.price.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Stokta: <strong>{product.stock}</strong> adet
            </div>
          </div>

          {!admin && (
            <button
              className="btn"
              type="button"
              style={{ width: '100%', justifyContent: 'center', marginBottom: '0.8rem' }}
              onClick={() => addToCart(product)}
            >
              Sepete Ekle <span>+</span>
            </button>
          )}

          {admin && (
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                marginTop: 0,
              }}
            >
              Admin modundasınız; sepet işlemleri bu rolde pasif durumdadır.
            </p>
          )}

          <Link
            to={`/koleksiyon/${product.category}`}
            style={{ marginTop: '0.5rem', display: 'inline-block' }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Koleksiyona Geri Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

