import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'

export function AdminLoginPage() {
  const { adminLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const ok = await adminLogin(email.trim(), password)
    // adminLogin true döndürdüyse yönlendir, AuthContext admin state'ini biraz geç güncelleyebilir
    // bu yüzden directly yönlendirmeyi deneyebiliriz veya AuthContext'teki değişikliği bekleyebiliriz 
    // ama basitlik için ok kontrolü yeterli olmalıydı.

    if (ok) {
      // Force hard navigation to ensure clean state
      window.location.replace('/admin')
    } else {
      setError('Admin girişi başarısız. Örnek kullanıcı: admin@nordicliving.com / admin123')
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">ADMIN PANEL</div>
          <h1 className="page-title">Yönetici Girişi</h1>
        </div>
        <p className="page-subtitle">
          Ürün ekleme, stok güncelleme ve koleksiyon yönetimi için yönetici hesabınızla giriş
          yapın.
        </p>
      </div>

      <form
        className="card-soft"
        style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="admin-email"
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
            }}
          >
            E-posta
          </label>
          <input
            id="admin-email"
            type="email"
            className="input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="admin-password"
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
            }}
          >
            Şifre
          </label>
          <input
            id="admin-password"
            type="password"
            className="input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: '#f2b6b6', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
        <button className="btn" type="submit" style={{ marginTop: '0.5rem', width: '100%' }}>
          Giriş Yap <span>↗</span>
        </button>
      </form>
    </div>
  )
}

