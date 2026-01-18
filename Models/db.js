import sql from 'mssql/msnodesqlv8.js';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'appsettings.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

export const DB_CONFIG = {
    driver: configData.Database.Driver,
    connectionString: configData.Database.ConnectionString
};

export async function connectToDb() {
    try {
        const pool = await sql.connect(DB_CONFIG);
        return pool;
    } catch (err) {
        console.error('❌ Veritabanı bağlantı hatası:', err);
        throw err;
    }
}

export { sql };
