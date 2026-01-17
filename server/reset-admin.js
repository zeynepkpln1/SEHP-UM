import sql from 'mssql/msnodesqlv8.js';

const config = {
    driver: 'msnodesqlv8',
    connectionString: 'Server=.\\SQLEXPRESS;Database=sehpium;Trusted_Connection=True;TrustServerCertificate=True;',
};

async function checkAdmin() {
    try {
        const pool = await sql.connect(config);
        console.log('Veritabanına bağlanıldı.');

        // Tablo kontrolü
        const tableCheck = await pool.request().query("SELECT * FROM sysobjects WHERE name='Admins' and xtype='U'");
        if (tableCheck.recordset.length === 0) {
            console.log('Admins tablosu bulunamadı. Oluşturuluyor...');
            await pool.request().query("CREATE TABLE Admins (email NVARCHAR(100) PRIMARY KEY, password NVARCHAR(100))");
        } else {
            console.log('Admins tablosu mevcut.');
        }

        // Admin kontrolü
        const adminCheck = await pool.request().query("SELECT * FROM Admins WHERE email='admin@nordicliving.com'");
        if (adminCheck.recordset.length === 0) {
            console.log('Admin kullanıcısı yok. Oluşturuluyor...');
            await pool.request()
                .input('email', sql.NVarChar, 'admin@nordicliving.com')
                .input('password', sql.NVarChar, 'admin123')
                .query("INSERT INTO Admins (email, password) VALUES (@email, @password)");
            console.log('Admin oluşturuldu.');
        } else {
            console.log('Admin kullanıcısı mevcut. Şifre sıfırlanıyor...');
            await pool.request()
                .input('email', sql.NVarChar, 'admin@nordicliving.com')
                .input('password', sql.NVarChar, 'admin123')
                .query("UPDATE Admins SET password=@password WHERE email=@email");
            console.log('Admin şifresi yenilendi: admin123');
        }

        // Test Login Query
        const loginTest = await pool.request()
            .input('email', sql.NVarChar, 'admin@nordicliving.com')
            .input('password', sql.NVarChar, 'admin123')
            .query('SELECT * FROM Admins WHERE email = @email AND password = @password');

        if (loginTest.recordset.length > 0) {
            console.log('TEST BAŞARILI: Giriş bilgileri veritabanında doğrulandı.');
        } else {
            console.log('TEST BAŞARISIZ: Giriş bilgileri doğrulanamadı!');
        }

        process.exit(0);
    } catch (err) {
        console.error('Hata:', err);
        process.exit(1);
    }
}

checkAdmin();
