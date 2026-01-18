import { useState, useRef } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../state/ProductsContext'
import type { Product, Category } from '../../state/ProductsContext'
import { useAuth } from '../../state/AuthContext'

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  category: 'sehpa',
  imageUrl: '',
  badge: '',
  stock: 0,
}

export function AdminDashboardPage() {
  const { products, setProducts } = useProducts()
  const { adminLogout } = useAuth()
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleEdit = (product: Product) => {
    setEditing(product)
    const { id, ...rest } = product
    setForm(rest)
  }

  const resetForm = () => {
    setEditing(null)
    setForm(emptyProduct)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price) return

    if (editing) {
      // Update
      const updatedProduct = { ...editing, ...form }
      await fetch(`/api/products/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      })

      const updated = products.map(p =>
        p.id === editing.id ? updatedProduct : p
      )
      setProducts(updated)
    } else {
      // Create
      const id = `${form.category}-${Date.now()}`
      const created: Product = { id, ...form }

      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created),
      })

      setProducts([...products, created])
    }

    resetForm()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return

    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    setProducts(products.filter(p => p.id !== id))
    if (editing?.id === id) resetForm()
  }

  const handleFieldChange = (key: keyof Omit<Product, 'id'>, value: string | number) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    setUploading(true)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setForm(prev => ({ ...prev, imageUrl: data.url }))
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Görsel yüklenirken hata oluştu')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow" style={{ color: '#d4af37' }}>ADMIN PANEL</div>
          <h1 className="page-title">Ürün Yönetimi</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Link
            to="/urunler"
            target="_blank"
            className="btn btn-secondary"
            style={{ borderColor: '#444', color: '#ccc' }}
          >
            Sitede Gör <span>↗</span>
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={adminLogout}
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="grid grid-2">
        <form
          className="card-soft"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: '#1a1816',
            border: '1px solid #333',
            color: '#eee'
          }}
          onSubmit={handleSubmit}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: '0.4rem',
              fontSize: '1.1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#d4af37',
              borderBottom: '1px solid #333',
              paddingBottom: '0.5rem'
            }}
          >
            {editing ? 'ÜRÜNÜ GÜNCELLE & STOK DÜZENLE' : 'YENİ ÜRÜN & STOK GİRİŞİ'}
          </h2>
          <div>
            <label htmlFor="name" className="admin-label">Ürün Adı</label>
            <input
              id="name"
              className="input admin-input"
              value={form.name}
              onChange={e => handleFieldChange('name', e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="admin-label">Açıklama</label>
            <textarea
              id="description"
              className="textarea admin-input"
              rows={3}
              value={form.description}
              onChange={e => handleFieldChange('description', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="price" className="admin-label">Fiyat (₺)</label>
              <input
                id="price"
                type="number"
                min={0}
                className="input admin-input"
                value={form.price || ''}
                onChange={e => handleFieldChange('price', Number(e.target.value) || 0)}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="stock" className="admin-label">Stok</label>
              <input
                id="stock"
                type="number"
                min={0}
                className="input admin-input"
                value={form.stock || ''}
                onChange={e => handleFieldChange('stock', Number(e.target.value) || 0)}
                required
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="category" className="admin-label">Kategori</label>
              <select
                id="category"
                className="input admin-input"
                value={form.category}
                onChange={e => handleFieldChange('category', e.target.value as Category)}
              >
                <option value="sehpa">Sehpa</option>
                <option value="lambader">Lambader</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="badge" className="admin-label">Rozet</label>
              <input
                id="badge"
                className="input admin-input"
                value={form.badge ?? ''}
                onChange={e => handleFieldChange('badge', e.target.value)}
                placeholder="Örn: Yeni"
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Görsel Ekle</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ color: '#ccc', fontSize: '0.85rem' }}
              />
            </div>
            {uploading && <div style={{ color: '#d4af37', fontSize: '0.8rem', marginTop: '0.4rem' }}>Görsel yükleniyor...</div>}

            <div style={{ marginTop: '0.5rem' }}>
              <label htmlFor="imageUrl" className="admin-label" style={{ fontSize: '0.75rem' }}>veya Görsel URL</label>
              <input
                id="imageUrl"
                className="input admin-input"
                value={form.imageUrl}
                placeholder="https://..."
                style={{ fontSize: '0.85rem', padding: '0.4rem' }}
                onChange={e => {
                  let val = e.target.value;
                  // Remove quotes if present
                  val = val.replace(/['"]/g, '');
                  // Normalize slashes
                  val = val.replace(/\\/g, '/');

                  // Auto-convert local absolute paths to relative web paths
                  // Example: C:/sehpium/public/images/foo.jpg -> /images/foo.jpg
                  if (val.includes('/public/')) {
                    val = val.split('/public/')[1];
                    if (!val.startsWith('/')) val = '/' + val;
                  }

                  handleFieldChange('imageUrl', val);
                }}
              />
            </div>

            {form.imageUrl && (
              <div style={{ marginTop: '0.8rem', border: '1px solid #333', borderRadius: 8, overflow: 'hidden', height: 160, width: '100%', background: '#000' }}>
                <img src={form.imageUrl} alt="Önizleme" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
            <button
              className="btn"
              type="submit"
              disabled={uploading}
              style={{ flex: 1, justifyContent: 'center', background: '#d4af37', color: '#000', fontWeight: 'bold' }}
            >
              {editing ? 'GÜNCELLE' : 'EKLE'}
            </button>
            {editing && (
              <button
                className="btn btn-secondary"
                type="button"
                style={{ flex: 1, justifyContent: 'center', borderColor: '#d4af37', color: '#d4af37' }}
                onClick={resetForm}
              >
                İPTAL
              </button>
            )}
          </div>
        </form>

        <div className="card-elevated" style={{ background: '#1a1816', border: '1px solid #333', color: '#eee' }}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: '0.6rem',
              fontSize: '1.02rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#d4af37'
            }}
          >
            TÜM ÜRÜNLER LİSTESİ
          </h2>
          <div style={{ maxHeight: 600, overflow: 'auto', paddingRight: '0.3rem' }}>
            {products.map(p => (
              <div
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto auto',
                  gap: '0.8rem',
                  alignItems: 'center',
                  padding: '0.8rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 6, overflow: 'hidden', background: '#000' }}>
                  {p.imageUrl && <img src={p.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.98rem',
                      letterSpacing: '0.04em',
                      color: '#fff'
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>
                    Stok: <span style={{ color: p.stock < 5 ? '#f2b6b6' : '#999' }}>{p.stock}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#d4af37' }}>
                  {p.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                    maximumFractionDigits: 0,
                  })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.75rem',
                      justifyContent: 'center',
                      borderColor: '#444',
                      color: '#ccc'
                    }}
                    onClick={() => handleEdit(p)}
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.75rem',
                      justifyContent: 'center',
                      background: '#3a0000',
                      border: 'none',
                      color: '#ff9999'
                    }}
                    onClick={() => handleDelete(p.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .admin-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #d4af37;
            margin-bottom: 0.3rem;
            display: block;
        }
        .admin-input {
            background: #0b0b0b !important;
            border: 1px solid #333 !important;
            color: #fff !important;
        }
        .admin-input:focus {
            border-color: #d4af37 !important;
            outline: none;
        }
      `}</style>
    </div>
  )
}

