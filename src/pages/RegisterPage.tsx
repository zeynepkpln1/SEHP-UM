import { FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      setError('Şifreniz en az 6 karakter olmalı.')
      return
    }
    const ok = await register(email, password)
    if (!ok) {
      setError('Lütfen geçerli bir e-posta ve şifre girin.')
      return
    }
    navigate('/')
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">HESAP OLUŞTURUN</div>
          <h1 className="page-title">NordicLiving’e Katılın</h1>
        </div>
        <p className="page-subtitle">
          Ücretsiz üyeliğinizle koleksiyonlarımıza daha yakından bakabilir, sepetinizi kaydedebilir
          ve kişiselleştirilmiş öneriler alabilirsiniz.
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
            Üye Ol <span>↗</span>
          </button>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Zaten hesabınız var mı?{' '}
            <Link to="/giris" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Giriş yapın
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
            NordicLiving Dünyası
          </h2>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.8 }}>
            Üyelikle birlikte; özel ön siparişlere erişim, kişiye özel stil önerileri ve sınırlı
            koleksiyon lansman davetlerinden ilk siz haberdar olun.
          </p>
        </div>
      </div>
    </div>
  )
}

