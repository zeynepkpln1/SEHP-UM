import { sql, connectToDb } from '../Models/db.js';

const newProducts = [
    {
        id: 'bia-set-01',
        name: 'Bia Sehpa Takımı',
        description: 'Modern çizgileriyle salonunuza şıklık katan, fonksiyonel ve estetik Bia Sehpa Takımı.',
        price: 8500,
        category: 'sehpa',
        imageUrl: '/images/resimler/bia-sehpa-takimi-2.jpg',
        badge: 'Çok Satan',
        stock: 5
    },
    {
        id: 'bianca-wood-01',
        name: 'Bianca Ahşap Zigon',
        description: 'Doğal ahşap dokusuyla sıcak bir atmosfer yaratan, iç içe geçen pratik zigon seti.',
        price: 4200,
        category: 'sehpa',
        imageUrl: '/images/resimler/bianca-zigon-sehpa-ahsap-1.jpg',
        badge: 'Doğal',
        stock: 8
    },
    {
        id: 'icona-marble-01',
        name: 'Icona Mermer Orta Sehpa',
        description: 'Gerçek mermer desenli yüzeyi ve gold detaylı ayaklarıyla lüks bir görünüm sunar.',
        price: 6750,
        category: 'sehpa',
        imageUrl: '/images/resimler/icona-vol1-mermer-desen-orta-sehpa-030425-1.jpg',
        badge: 'Lüks',
        stock: 3
    },
    {
        id: 'norma-zigon-01',
        name: 'Norma Zigon Serisi',
        description: 'Minimalist tasarımı ve dayanıklı yapısıyla her mekana uyum sağlayan modern zigonlar.',
        price: 3900,
        category: 'sehpa',
        imageUrl: '/images/resimler/norma-vol1-zigon-sehpa-030425-2.jpg',
        stock: 10
    },
    {
        id: 'orb-center-01',
        name: 'Orb Küre Orta Sehpa',
        description: 'Yuvarlak formu ve fütüristik ayak tasarımıyla salonunuzun odak noktası olmaya aday.',
        price: 7800,
        category: 'sehpa',
        imageUrl: '/images/resimler/orb-vol1-orta-sehpa-030425-2.jpg',
        badge: 'Yeni Sezon',
        stock: 4
    },
    {
        id: 'sivella-center-01',
        name: 'Sivella Orta Sehpa',
        description: 'Geniş kullanım alanı ve sağlam yapısıyla hem şık hem kullanışlı bir orta sehpa deneyimi.',
        price: 5400,
        category: 'sehpa',
        imageUrl: '/images/resimler/sivella-orta-sehpa-120525-1.jpg',
        stock: 6
    },
    {
        id: 'zeta-dome-01',
        name: 'Zeta Dome Takım',
        description: 'Kubbe formlu ayakları ve özel tasarım tablasıyla sanat eseri niteliğinde bir set.',
        price: 9200,
        category: 'sehpa',
        imageUrl: '/images/resimler/zeta-vol-dome-sehpa-takimi-200525-1.jpg',
        badge: 'Özel Tasarım',
        stock: 2
    }
];

async function restore() {
    try {
        const pool = await connectToDb();
        console.log('✅ Connected to DB');

        console.log('🗑️ Clearing Products table...');
        await pool.request().query('DELETE FROM Products');

        console.log('🌱 Seeding CORRECT data...');
        for (const p of newProducts) {
            await pool.request()
                .input('id', sql.NVarChar, p.id)
                .input('name', sql.NVarChar, p.name)
                .input('description', sql.NVarChar, p.description)
                .input('price', sql.Int, p.price)
                .input('category', sql.NVarChar, p.category)
                .input('imageUrl', sql.NVarChar, p.imageUrl)
                .input('badge', sql.NVarChar, p.badge || null)
                .input('stock', sql.Int, p.stock)
                .query(`
                    INSERT INTO Products (id, name, description, price, category, imageUrl, badge, stock, created_at)
                    VALUES (@id, @name, @description, @price, @category, @imageUrl, @badge, @stock, GETDATE())
                `);
            console.log(`Initialized: ${p.name}`);
        }
        console.log('✨ Data restoration OK.');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

restore();
