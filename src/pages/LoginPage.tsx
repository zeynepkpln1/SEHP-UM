import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export function LoginPage() {
  const { login, adminLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Check if it's admin credentials
    const isAdmin = await adminLogin(email, password)
    if (isAdmin) {
      navigate('/admin')
      return;
    }

    // Try regular user login
    const isUser = await login(email, password)
    if (isUser) {
      navigate('/')
    } else {
      setError('Giriş başarısız. Bilgilerinizi kontrol edin.')
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">HESABINIZ</div>
          <h1 className="page-title">Giriş Yapın</h1>
        </div>
        <p className="page-subtitle">
          NordicLiving hesabınıza giriş yaparak favori ürünlerinizi saklayın ve sepetinizi tüm
          cihazlarınızda senkron tutun.
        </p>
      </div>

      <div className="grid grid-2">
        <form
          className="card-soft"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
              }}
            >
              E-posta
            </label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
              }}
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p style={{ color: '#b02a2a', fontSize: '0.85rem', margin: 0 }}>{error}</p>
          )}
          <button className="btn" type="submit" style={{ marginTop: '0.5rem', width: '100%' }}>
            Giriş Yap <span>↗</span>
          </button>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Henüz hesabınız yok mu?{' '}
            <Link to="/uye-ol" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Üye olun
            </Link>
            .
          </p>
        </form>

        <div className="card-elevated">
          <h2
            style={{
              marginTop: 0,
              marginBottom: '0.9rem',
              fontSize: '1.05rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Üyelik Avantajları
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.1rem',
              fontSize: '0.92rem',
              lineHeight: 1.9,
            }}
          >
            <li>Favori sehpa ve lambader tasarımlarınızı kaydedin.</li>
            <li>Sipariş geçmişinize tek ekrandan ulaşın.</li>
            <li>Yeni koleksiyon ve kampanyalardan önce haberdar olun.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

