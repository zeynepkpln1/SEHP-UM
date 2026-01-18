import { sql } from './db.js';

export class AdminModel {
    static async initTable(pool) {
        const adminTableCheck = await pool.request().query("SELECT * FROM sysobjects WHERE name='Admins' and xtype='U'");
        if (adminTableCheck.recordset.length === 0) {
            console.log('🛡️ Admins tablosu oluşturuluyor...');
            await pool.request().query("CREATE TABLE Admins (email NVARCHAR(100) PRIMARY KEY, password NVARCHAR(100))");
        }
        await this.ensureAdmin(pool);
    }

    static async ensureAdmin(pool) {
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

    static async login(pool, email, password) {
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM Admins WHERE email = @email AND password = @password');

        return result.recordset.length > 0;
    }
}
