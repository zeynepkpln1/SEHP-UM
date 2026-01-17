import type { Product } from '../../state/ProductsContext'
import { useCart } from '../../state/CartContext'
import { useAuth } from '../../state/AuthContext'
import { Link } from 'react-router-dom'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const { admin } = useAuth()

  return (
    <div
      className="card-soft fade-in-up"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
    >
      <Link to={`/urun/${product.id}`}>
        <div
          style={{
            borderRadius: 18,
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '4 / 3',
            background: '#141217',
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 400ms ease-out',
            }}
            className="product-image"
          />
          {product.badge && (
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
              }}
            >
              <div className="badge">
                <span className="badge-dot" />
                {product.badge}
              </div>
            </div>
          )}
        </div>
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              letterSpacing: '0.04em',
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              margin: '0.3rem 0 0.5rem',
              fontSize: '0.86rem',
              color: 'var(--text-muted)',
              maxWidth: '14rem',
            }}
          >
            {product.description}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            {product.category === 'sehpa' ? 'Sehpa' : 'Lambader'}
          </span>
          <div style={{ marginTop: 4, fontWeight: 600 }}>
            {product.price.toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'TRY',
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.4rem',
        }}
      >
        {!admin && (
          <button
            className="btn"
            style={{ paddingInline: '1.2rem', fontSize: '0.8rem' }}
            onClick={() => addToCart(product)}
          >
            Sepete Ekle <span>+</span>
          </button>
        )}
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Stok: {product.stock}
        </span>
      </div>
    </div>
  )
}

