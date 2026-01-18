import { Link } from 'react-router-dom'

export function HomePage() {
  // Sadece vitrin için birkaç ürün gösterelim (veya hiç göstermeyip sadece görsel/metin odaklı yapabiliriz)
  // Kullanıcı "tasarımsal olsun" dediği için büyük görseller ve tipografi kullanalım.

  return (
    <div className="page">
      {/* Hero Section */}
      <section
        className="fade-in-up"
        style={{
          minHeight: '80vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '4rem',
        }}
      >
        <div>
          <div className="pill" style={{ marginBottom: '1.5rem' }}>
            <span className="pill-dot" />
            NORDIC LIVING
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#d4af37',
              marginBottom: '1.5rem',
            }}
          >
            Sadelik, <br />
            Doğallık ve <br />
            Zarafet.
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '2.5rem',
              maxWidth: '32rem',
            }}
          >
            İskandinav minimalizmini evinizin sıcaklığıyla buluşturuyoruz.
            Her parça, zamansız bir hikaye anlatmak için tasarlandı.
            Doğal ahşap dokuları ve modern çizgilerin dansına şahit olun.
          </p>

          <Link to="/urunler">
            <button className="btn">
              Koleksiyonu Keşfet <span>→</span>
            </button>
          </Link>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '70%',
              height: '70%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,0) 70%)',
              zIndex: -1,
            }}
          />
          <img
            src="/images/resimler/ana sayfa resim.jpg"
            alt="Showroom"
            style={{
              borderRadius: '2rem 0 2rem 0',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              background: '#1a1816',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              maxWidth: '200px'
            }}
          >
            <div style={{ color: '#d4af37', fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>100%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>El İşçiliği ve Doğal Malzeme</div>
          </div>
        </div>
      </section>

      {/* Decorative Text Section */}
      <section style={{ margin: '8rem 0', textAlign: 'center' }}>
        <h2 style={{
          color: 'var(--text-muted)',
          fontSize: '1rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Tasarım Felsefemiz
        </h2>
        <p style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontFamily: 'var(--font-serif)',
          maxWidth: '50rem',
          margin: '0 auto',
          lineHeight: 1.4
        }}>
          "Eviniz, ruhunuzun bir yansımasıdır. Biz sadece bu yansımayı
          <span style={{ color: '#d4af37', fontStyle: 'italic' }}> en saf haliyle</span> ortaya çıkarıyoruz."
        </p>
      </section>
    </div>
  )
}
