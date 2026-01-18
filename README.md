# Sehpium Project

Bu proje, Nordic Living tarzı mobilya e-ticaret sitesi için geliştirilmiştir.
Proje yapısı **MVC (Model-View-Controller)** mimarisine uygun olarak düzenlenmiştir.

## Proje Yapısı

- **Controllers/**: İş mantığını ve API endpoint yönetimini sağlar.
- **Models/**: Veritabanı şemalarını ve veri erişim katmanını içerir.
- **Views/**: Kullanıcı arayüzü (React) kodlarını içerir.
- **server/**: Backend sunucu yapılandırması.
- **appsettings.json**: Veritabanı ve sunucu ayarları.

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme modunda çalıştırın (Frontend + Backend):
   ```bash
   npm run dev
   ```

3. Veritabanı oluşturma:
   Uygulama ilk çalıştığında `sehpium` veritabanını ve gerekli tabloları otomatik olarak oluşturur (MSSQL / SQLEXPRESS gerektirir).

## Mimari Notlar

- **Model**: Veritabanı işlemleri `mssql` ve `msnodesqlv8` kullanılarak modellenmiştir.
- **View**: Frontend `Views` klasörü altında Vite + React ile geliştirilmiştir.
- **Controller**: Express.js route logic'leri ayrı controller dosyalarına bölünmüştür.

## Gereksinimler

- Node.js
- SQL Server Express (yerel bağlantı için)
