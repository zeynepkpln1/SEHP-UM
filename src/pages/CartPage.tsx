import { useCart } from '../state/CartContext'

export function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()

  const hasItems = items.length > 0

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">SEPET</div>
          <h1 className="page-title">Seçtiğiniz Ürünler</h1>
        </div>
        <p className="page-subtitle">
          Sepetinizdeki sehpa ve lambaderleri düzenleyebilir, adetleri güncelleyebilir ve toplam
          tutarı görebilirsiniz.
        </p>
      </div>

      {!hasItems ? (
        <div className="card-elevated">
          <p style={{ margin: 0, fontSize: '0.95rem' }}>Sepetiniz şu anda boş.</p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Koleksiyonumuzu keşfederek favori parçalarınızı ekleyin.
          </p>
        </div>
      ) : (
        <div className="grid grid-2">
          <div className="card-soft">
            {items.map(item => (
              <div
                key={item.product.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '0.9rem',
                  alignItems: 'center',
                  padding: '0.65rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#e3d6c8',
                  }}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {item.product.category === 'sehpa' ? 'Sehpa' : 'Lambader'}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.product.name}
                  </div>
                  <div
                    style={{
                      marginTop: 2,
                      fontSize: '0.86rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {item.product.price.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      borderRadius: 999,
                      border: '1px solid rgba(0,0,0,0.14)',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        padding: '0.25rem 0.6rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span
                      style={{
                        padding: '0.25rem 0.7rem',
                        borderInline: '1px solid rgba(0,0,0,0.12)',
                        fontSize: '0.9rem',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      style={{
                        padding: '0.25rem 0.6rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    style={{
                      marginTop: '0.5rem',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.78rem',
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card-elevated">
            <h2
              style={{
                marginTop: 0,
                marginBottom: '1rem',
                fontSize: '1.05rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Sipariş Özeti
            </h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.4rem',
                fontSize: '0.9rem',
              }}
            >
              <span>Ürünler</span>
              <span>
                {total.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.4rem',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>Teslimat</span>
              <span>Kasada Hesaplanacak</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.08)' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.6rem',
                marginBottom: '1rem',
                fontSize: '0.98rem',
                fontWeight: 600,
              }}
            >
              <span>Toplam</span>
              <span>
                {total.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <button className="btn" type="button" style={{ width: '100%', justifyContent: 'center' }}>
              Devam Et <span>↗</span>
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '0.7rem',
              }}
              onClick={clearCart}
            >
              Sepeti Boşalt
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

