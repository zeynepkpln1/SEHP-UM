import express from 'express';
import sql from 'mssql/msnodesqlv8.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// --- Configuration ---
const PORT = 3001;
const DB_CONFIG = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=.\\SQLEXPRESS;Database=sehpium;Trusted_Connection=yes;TrustServerCertificate=yes;',
};

// --- App Setup ---
const app = express();
app.use(cors());
app.use(express.json());

// --- File Upload Logic ---
const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');

// Ensure upload directory exists
import fs from 'fs';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`📁 Upload klasörü oluşturuldu: ${uploadDir}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// --- Database Initialization & Migration ---
async function initializeDb() {
    try {
        const pool = await sql.connect(DB_CONFIG);
        console.log('✅ Veritabanı bağlantısı başarılı.');

        // 1. Products Tablosu Kontrolü
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
            await seedProducts(pool);
        } else {
            // Migration: created_at sütunu yoksa ekle
            const colCheck = await pool.request().query("SELECT * FROM sys.columns WHERE Name = N'created_at' AND Object_ID = Object_ID(N'Products')");
            if (colCheck.recordset.length === 0) {
                console.log('🔧 Veritabanı güncelleniyor: created_at sütunu ekleniyor...');
                await pool.request().query("ALTER TABLE Products ADD created_at DATETIME DEFAULT GETDATE()");
            }
        }

        // 2. Admins Tablosu Kontrolü
        const adminTableCheck = await pool.request().query("SELECT * FROM sysobjects WHERE name='Admins' and xtype='U'");
        if (adminTableCheck.recordset.length === 0) {
            console.log('🛡️ Admins tablosu oluşturuluyor...');
            await pool.request().query("CREATE TABLE Admins (email NVARCHAR(100) PRIMARY KEY, password NVARCHAR(100))");
        }

        // 3. Admin Kullanıcısı (Upsert)
        await ensureAdmin(pool);

    } catch (err) {
        console.error('❌ Veritabanı hatası:', err);
    }
}

async function seedProducts(pool) {
    const initialProducts = [
        { id: 'coffee-01', name: 'Aalto Oval Sehpa', description: 'İnce metal ayaklar ve yumuşak ovalliklere sahip, siyah-gold detaylı orta sehpa.', price: 6490, category: 'sehpa', imageUrl: '/images/sehpa/sehpa1.jpg', badge: 'Yeni', stock: 8 },
        { id: 'coffee-02', name: 'Nord Oak Orta Sehpa', description: 'Mat siyah gövde ve doğal meşe yüzeyle lüks showroom hissi veren orta sehpa.', price: 7290, category: 'sehpa', imageUrl: '/images/sehpa/sehpa2.jpg', badge: 'En Çok Satan', stock: 4 },
        { id: 'coffee-03', name: 'Linea Mermer Sehpa', description: 'Gold çizgilerle bölünmüş mermer efektli tabla ve koyu metal ayaklar.', price: 9890, category: 'sehpa', imageUrl: '/images/sehpa/sehpa3.jpg', stock: 3 },
        { id: 'lamp-01', name: 'Lumi Arch Lambader', description: 'Kavisli siyah gövde ve bej keten şapka ile salon köşelerine heykelsi bir ışık.', price: 5590, category: 'lambader', imageUrl: '/images/lambader/lambader1.jpg', badge: 'Sınırlı', stock: 6 },
        { id: 'lamp-02', name: 'Oslo Tripod Lambader', description: 'Üç ayaklı ahşap tripod gövde ve gold detaylı bağlantılarla dengeli bir siluet.', price: 4890, category: 'lambader', imageUrl: '/images/lambader/lambader2.jpg', stock: 10 },
        { id: 'lamp-03', name: 'Nord Soft Glow', description: 'Opal cam küre ve ince siyah ayaklarla yumuşak, dağılmış bir aydınlatma.', price: 6190, category: 'lambader', imageUrl: '/images/lambader/lambader3.jpg', stock: 5 },
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

async function ensureAdmin(pool) {
    const adminEmail = 'admin@nordicliving.com';
    const adminPass = 'admin123';

    const check = await pool.request().input('email', sql.NVarChar, adminEmail).query("SELECT * FROM Admins WHERE email = @email");
    if (check.recordset.length === 0) {
        await pool.request().input('email', sql.NVarChar, adminEmail).input('password', sql.NVarChar, adminPass).query("INSERT INTO Admins VALUES (@email, @password)");
        console.log(`👤 Admin oluşturuldu: ${adminEmail}`);
    } else {
        await pool.request().input('email', sql.NVarChar, adminEmail).input('password', sql.NVarChar, adminPass).query("UPDATE Admins SET password = @password WHERE email = @email");
        console.log(`👤 Admin doğrulandı: ${adminEmail}`);
    }
}

// --- API Routes ---

// Upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Dosya yüklenemedi' });
    const publicPath = `/images/uploads/${req.file.filename}`;
    res.json({ success: true, url: publicPath });
});

// Admin Auth
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await sql.connect(DB_CONFIG);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM Admins WHERE email = @email AND password = @password');

        if (result.recordset.length > 0) res.json({ success: true, user: { email } });
        else res.status(401).json({ success: false, message: 'Geçersiz bilgiler' });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Products CRUD
app.get('/api/products', async (req, res) => {
    try {
        const pool = await sql.connect(DB_CONFIG);
        // created_at varsa ona göre, yoksa isme göre sırala (Güvenli olması için try-catch içinde basit query)
        const result = await pool.request().query('SELECT * FROM Products ORDER BY created_at DESC');
        res.json(result.recordset);
    } catch (err) {
        // Sütun yoksa fallback
        const pool = await sql.connect(DB_CONFIG);
        const result = await pool.request().query('SELECT * FROM Products');
        res.json(result.recordset);
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { id, name, description, price, category, imageUrl, badge, stock } = req.body;
        const pool = await sql.connect(DB_CONFIG);
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
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hata' });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, imageUrl, badge, stock } = req.body;
        const pool = await sql.connect(DB_CONFIG);
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
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Hata' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await sql.connect(DB_CONFIG);
        await pool.request().input('id', sql.NVarChar, id).query('DELETE FROM Products WHERE id=@id');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Hata' });
    }
});

// Start
app.listen(PORT, () => {
    console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
    initializeDb();
});
