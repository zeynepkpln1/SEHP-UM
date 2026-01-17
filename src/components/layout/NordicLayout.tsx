import { Link, NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../state/AuthContext'
import { useCart } from '../../state/CartContext'

type Props = {
  children: ReactNode
}

export function NordicLayout({ children }: Props) {
  const { user, admin, logout, adminLogout } = useAuth()
  const { items } = useCart()
  const location = useLocation()

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const isAdminArea = location.pathname.startsWith('/admin')

  if (isAdminArea) {
    return (
      <div className="app-shell" style={{ backgroundColor: '#050506', color: '#f5f0ea' }}>
        <main className="app-main">
          <div className="nordic-container">{children}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header
        style={{
          position: 'fixed',
          insetInline: 0,
          top: 0,
          zIndex: 20,
          backdropFilter: 'blur(18px)',
        }}
      >
        <div className="nordic-container" style={{ paddingTop: '1.1rem', paddingBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.55rem 0.95rem',
              borderRadius: '999px',
              background: 'rgba(20, 20, 22, 0.9)', // Dark background
              border: '1px solid rgba(215, 179, 98, 0.25)', // Subtle gold border
              boxShadow: '0 18px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background:
                    'radial-gradient(circle at 30% 20%, #ffe7c4 0, #c79a6a 45%, #8c6843 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
                }}
              >
                <span style={{ fontSize: 19, color: '#1b130a', fontWeight: 600 }}>N</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    letterSpacing: '0.18em',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    color: '#f4efe6', // Light text
                  }}
                >
                  NordicLiving
                </span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(244, 239, 230, 0.5)', // Muted light text
                  }}
                >
                  Atelier Collection
                </span>
              </div>
            </Link>

            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.4rem',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  opacity: isActive ? 1 : 0.65,
                  borderBottom: isActive ? '1px solid #d4af37' : '1px solid transparent',
                  paddingBottom: 4,
                  color: '#f4efe6',
                })}
              >
                Ana Sayfa
              </NavLink>
              <NavLink
                to="/urunler"
                style={({ isActive }) => ({
                  opacity: isActive ? 1 : 0.65,
                  borderBottom: isActive ? '1px solid #d4af37' : '1px solid transparent', // Gold underline
                  paddingBottom: 4,
                  color: '#f4efe6',
                })}
              >
                Ürünler
              </NavLink>
              <NavLink
                to="/iletisim"
                style={({ isActive }) => ({
                  opacity: isActive ? 1 : 0.65,
                  borderBottom: isActive ? '1px solid #d4af37' : '1px solid transparent', // Gold underline
                  paddingBottom: 4,
                  color: '#f4efe6',
                })}
              >
                İletişim
              </NavLink>
            </nav>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                fontSize: '0.8rem',
              }}
            >
              {!admin && (
                <Link
                  to="/sepet"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '0.35rem 0.75rem',
                    borderRadius: 999,
                    border: '1px solid rgba(215, 179, 98, 0.6)',
                    background: 'rgba(5,5,6,0.9)',
                  }}
                >
                  <span role="img" aria-label="bag">
                    👜
                  </span>
                  <span>Sepet</span>
                  {cartCount > 0 && (
                    <span
                      style={{
                        minWidth: 18,
                        height: 18,
                        borderRadius: 999,
                        background: '#f4efe6',
                        color: '#050506',
                        fontSize: 11,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {admin ? (
                <>
                  <Link
                    to="/admin"
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                    }}
                  >
                    Admin Panel
                  </Link>
                  <button
                    className="btn-secondary"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.75rem' }}
                    onClick={adminLogout}
                  >
                    Çıkış
                  </button>
                </>
              ) : user ? (
                <button
                  className="btn-secondary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.75rem' }}
                  onClick={logout}
                >
                  Çıkış
                </button>
              ) : (
                <Link
                  to="/giris"
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="nordic-container">{children}</div>
      </main>

      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingBottom: '2.6rem' }}>
        <div className="nordic-container">
          <div
            className="grid grid-3"
            style={{
              paddingTop: '2.4rem',
              gap: '2.1rem',
            }}
          >
            <div>
              <div className="pill">
                <span className="pill-dot" />
                NORDICLIVING
              </div>
              <p
                style={{
                  marginTop: '1.1rem',
                  maxWidth: '19rem',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                }}
              >
                İskandinav estetiğini, zamansız formlarla birleştiren butik sehpa ve lambader
                koleksiyonu.
              </p>
            </div>

            <div>
              <h4
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: '0.9rem',
                }}
              >
                İLETİŞİM
              </h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>hello@nordicliving.com</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>+90 (212) 555 12 34</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Nişantaşı, İstanbul / Türkiye
              </p>
              <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.55rem' }}>
                <span role="img" aria-label="instagram">
                  📸
                </span>
                <span role="img" aria-label="pinterest">
                  📌
                </span>
                <span role="img" aria-label="behance">
                  🎨
                </span>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: '0.9rem',
                }}
              >
                BİZE ULAŞIN
              </h4>
              <form
                style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: 260 }}
                onSubmit={e => e.preventDefault()}
              >
                <input className="input" placeholder="E-posta adresiniz" />
                <textarea className="textarea" placeholder="Mesajınız" rows={3} />
                <button className="btn" type="submit">
                  Gönder <span>↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

