import { useState, type FormEvent } from 'react'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">İLETİŞİM</div>
          <h1 className="page-title">Bizimle İletişime Geçin</h1>
        </div>
        <p className="page-subtitle">
          Koleksiyonlarımız, ölçülendirme veya proje iş birlikleri hakkında sorularınız için bize
          dilediğiniz zaman ulaşabilirsiniz.
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card-soft">
          <h2
            style={{
              marginTop: 0,
              marginBottom: '0.8rem',
              fontSize: '1.05rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            İletişim Bilgileri
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            <strong>Adres:</strong> Teşvikiye Mah. Valikonağı Cad. No:24, Nişantaşı / İstanbul
          </p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.95rem' }}>
            <strong>Telefon:</strong> +90 (212) 555 12 34
          </p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.95rem' }}>
            <strong>E-posta:</strong> hello@nordicliving.com
          </p>

          <p
            style={{
              marginTop: '1.1rem',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}
          >
            Randevu ile showroom ziyareti, iç mimari danışmanlığı veya proje bazlı toplu siparişler
            için ekibimizle iletişime geçebilirsiniz.
          </p>
        </div>

        <form
          className="card-elevated"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
          onSubmit={handleSubmit}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: '0.5rem',
              fontSize: '1.05rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Bize Ulaşın
          </h2>
          <div>
            <label
              htmlFor="name"
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
              }}
            >
              İsim Soyisim
            </label>
            <input id="name" className="input" required />
          </div>
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
            <input id="email" type="email" className="input" required />
          </div>
          <div>
            <label
              htmlFor="message"
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
              }}
            >
              Mesajınız
            </label>
            <textarea id="message" className="textarea" rows={4} required />
          </div>
          <button className="btn" type="submit" style={{ marginTop: '0.4rem', width: '100%' }}>
            Mesaj Gönder <span>↗</span>
          </button>
          {sent && (
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Teşekkürler, mesajınız alınmıştır. En kısa sürede size dönüş yapacağız.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

