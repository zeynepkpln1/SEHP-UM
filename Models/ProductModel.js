import { sql } from './db.js';

export class ProductModel {
    static async initTable(pool) {
        const tableCheck = await pool.request().query("SELECT * FROM sysobjects WHERE name='Products' and xtype='U'");
        if (tableCheck.recordset.length === 0) {
            console.log('📦 Products tablosu oluşturuluyor...');
            await pool.request().query(`
                CREATE TABLE Products (
                  id NVARCHAR(50) PRIMARY KEY,
                  name NVARCHAR(100),
                  description NVARCHAR(MAX),
                  price INT,
                  category NVARCHAR(20),
                  imageUrl NVARCHAR(200),
                  badge NVARCHAR(50),
                  stock INT,
                  created_at DATETIME DEFAULT GETDATE()
                )
            `);
            console.log('📦 Products tablosu hazır.');
            await this.seedProducts(pool);
        } else {
            const colCheck = await pool.request().query("SELECT * FROM sys.columns WHERE Name = N'created_at' AND Object_ID = Object_ID(N'Products')");
            if (colCheck.recordset.length === 0) {
                console.log('🔧 Veritabanı güncelleniyor: created_at sütunu ekleniyor...');
                await pool.request().query("ALTER TABLE Products ADD created_at DATETIME DEFAULT GETDATE()");
            }
        }
    }

    static async seedProducts(pool) {
        const initialProducts = [
            { id: 'bia-set-01', name: 'Bia Sehpa Takımı', description: 'Modern çizgileriyle salonunuza şıklık katan, fonksiyonel ve estetik Bia Sehpa Takımı.', price: 8500, category: 'sehpa', imageUrl: '/images/resimler/bia-sehpa-takimi-2.jpg', badge: 'Çok Satan', stock: 5 },
            { id: 'bianca-wood-01', name: 'Bianca Ahşap Zigon', description: 'Doğal ahşap dokusuyla sıcak bir atmosfer yaratan, iç içe geçen pratik zigon seti.', price: 4200, category: 'sehpa', imageUrl: '/images/resimler/bianca-zigon-sehpa-ahsap-1.jpg', badge: 'Doğal', stock: 8 },
            { id: 'icona-marble-01', name: 'Icona Mermer Orta Sehpa', description: 'Gerçek mermer desenli yüzeyi ve gold detaylı ayaklarıyla lüks bir görünüm sunar.', price: 6750, category: 'sehpa', imageUrl: '/images/resimler/icona-vol1-mermer-desen-orta-sehpa-030425-1.jpg', badge: 'Lüks', stock: 3 },
            { id: 'norma-zigon-01', name: 'Norma Zigon Serisi', description: 'Minimalist tasarımı ve dayanıklı yapısıyla her mekana uyum sağlayan modern zigonlar.', price: 3900, category: 'sehpa', imageUrl: '/images/resimler/norma-vol1-zigon-sehpa-030425-2.jpg', stock: 10 },
            { id: 'orb-center-01', name: 'Orb Küre Orta Sehpa', description: 'Yuvarlak formu ve fütüristik ayak tasarımıyla salonunuzun odak noktası olmaya aday.', price: 7800, category: 'sehpa', imageUrl: '/images/resimler/orb-vol1-orta-sehpa-030425-2.jpg', badge: 'Yeni Sezon', stock: 4 },
            { id: 'sivella-center-01', name: 'Sivella Orta Sehpa', description: 'Geniş kullanım alanı ve sağlam yapısıyla hem şık hem kullanışlı bir orta sehpa deneyimi.', price: 5400, category: 'sehpa', imageUrl: '/images/resimler/sivella-orta-sehpa-120525-1.jpg', stock: 6 },
            { id: 'zeta-dome-01', name: 'Zeta Dome Takım', description: 'Kubbe formlu ayakları ve özel tasarım tablasıyla sanat eseri niteliğinde bir set.', price: 9200, category: 'sehpa', imageUrl: '/images/resimler/zeta-vol-dome-sehpa-takimi-200525-1.jpg', badge: 'Özel Tasarım', stock: 2 }
        ];

        console.log('🌱 Başlangıç verileri ekleniyor...');
        for (const product of initialProducts) {
            await pool.request()
                .input('id', sql.NVarChar, product.id)
                .input('name', sql.NVarChar, product.name)
                .input('description', sql.NVarChar, product.description)
                .input('price', sql.Int, product.price)
                .input('category', sql.NVarChar, product.category)
                .input('imageUrl', sql.NVarChar, product.imageUrl)
                .input('badge', sql.NVarChar, product.badge || null)
                .input('stock', sql.Int, product.stock)
                .query(`
                    INSERT INTO Products (id, name, description, price, category, imageUrl, badge, stock)
                    VALUES (@id, @name, @description, @price, @category, @imageUrl, @badge, @stock)
                `);
        }
    }

    static async getAll(pool) {
        try {
            return await pool.request().query('SELECT * FROM Products ORDER BY created_at DESC');
        } catch (err) {
            return await pool.request().query('SELECT * FROM Products');
        }
    }

    static async create(pool, data) {
        const { id, name, description, price, category, imageUrl, badge, stock } = data;
        await pool.request()
            .input('id', sql.NVarChar, id)
            .input('name', sql.NVarChar, name)
            .input('description', sql.NVarChar, description)
            .input('price', sql.Int, price)
            .input('category', sql.NVarChar, category)
            .input('imageUrl', sql.NVarChar, imageUrl)
            .input('badge', sql.NVarChar, badge)
            .input('stock', sql.Int, stock)
            .query(`
                INSERT INTO Products (id, name, description, price, category, imageUrl, badge, stock, created_at)
                VALUES (@id, @name, @description, @price, @category, @imageUrl, @badge, @stock, GETDATE())
            `);
    }

    static async update(pool, id, data) {
        const { name, description, price, category, imageUrl, badge, stock } = data;
        await pool.request()
            .input('id', sql.NVarChar, id)
            .input('name', sql.NVarChar, name)
            .input('description', sql.NVarChar, description)
            .input('price', sql.Int, price)
            .input('category', sql.NVarChar, category)
            .input('imageUrl', sql.NVarChar, imageUrl)
            .input('badge', sql.NVarChar, badge)
            .input('stock', sql.Int, stock)
            .query(`
                UPDATE Products SET 
                  name=@name, description=@description, price=@price, category=@category, 
                  imageUrl=@imageUrl, badge=@badge, stock=@stock
                WHERE id=@id
            `);
    }

    static async delete(pool, id) {
        await pool.request().input('id', sql.NVarChar, id).query('DELETE FROM Products WHERE id=@id');
    }
}
