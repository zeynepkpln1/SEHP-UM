# 📂 PROJE VE VERİ RAHORU

## 🗄️ Veritabanı (SQL Server)
Verileriniz proje klasörünün içinde değil, Windows'un **SQL Server** servisi tarafından yönetilen güvenli bir sistem klasöründe saklanmaktadır.

*   **Ana Veri Dosyası (.mdf):**
    `C:\Program Files\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQL\DATA\sehpium.mdf`
    *(Tüm ürünler, admin kullanıcıları ve fiyat bilgileri burada saklanır)*

*   **Log Dosyası (.ldf):**
    `C:\Program Files\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQL\DATA\sehpium_log.ldf`
    *(Yapılan işlemlerin geçmiş günlüğü burada tutulur)*

---

## 🌳 Proje Dosya Ağacı (Ne Nerede?)

```text
sehpium/ (Ana Proje Klasörü)
├── public/                     # 🌐 Herkese açık dosyalar
│   ├── images/
│   │   ├── uploads/            # 📸 Admin panelinden yüklediğiniz RESİMLER buraya gelir
│   │   ├── sehpa/              # Varsayılan sehpa resimleri
│   │   └── lambader/           # Varsayılan lambader resimleri
│   └── vite.svg
│
├── server/                     # 🧠 Arka Plan (Backend) Sistemi
│   └── index.js                # Sunucu kodu, Veritabanı bağlantısı ve API kuralları
│
├── src/                        # 🎨 Ön Yüz (Frontend) - Sitenin Tasarımı
│   ├── components/             # Butonlar, kartlar gibi parçalar
│   ├── pages/
│   │   ├── admin/              # Admin paneli sayfaları (Dashboard, Login)
│   │   │   └── AdminDashboardPage.tsx  # Ürün ekleme/düzenleme ekranı kodu
│   │   ├── HomePage.tsx        # Anasayfa
│   │   └── ... (Diğer sayfalar)
│   ├── state/                  # Veri Yönetimi
│   │   ├── AuthContext.tsx     # Giriş/Çıkış işlemleri mantığı
│   │   └── ProductsContext.tsx # Ürün verilerini çekme mantığı
│   ├── App.tsx                 # Ana yönlendirme (Router)
│   └── main.tsx                # Başlangıç noktası
│
├── index.html                  # Sitenin giriş kapısı
├── package.json                # Proje ayarları ve kütüphaneler
└── vite.config.ts              # Derleme ayarları
```

### ℹ️ Özet Bilgi
*   **Resimler:** `public/images/uploads` klasöründe.
*   **Yazılar/Fiyatlar:** SQL Server içindeki `.mdf` dosyasında.
*   **Site Tasarımı:** `src` klasöründeki kodlarda.
