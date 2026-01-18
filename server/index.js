import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import { ProductController } from '../Controllers/ProductController.js';
import { AdminController } from '../Controllers/AdminController.js';
import { UploadController, upload } from '../Controllers/UploadController.js';

import { connectToDb } from '../Models/db.js';
import { ProductModel } from '../Models/ProductModel.js';
import { AdminModel } from '../Models/AdminModel.js';

const configPath = path.join(process.cwd(), 'appsettings.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const PORT = configData.Server.Port || 3001;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/upload', upload.single('image'), UploadController.handleUpload);
app.post('/api/admin/login', AdminController.login);

app.get('/api/products', ProductController.getAll);
app.post('/api/products', ProductController.create);
app.put('/api/products/:id', ProductController.update);
app.delete('/api/products/:id', ProductController.delete);

async function init() {
    try {
        const pool = await connectToDb();
        console.log('✅ Veritabanı bağlantısı başarılı.');
        await ProductModel.initTable(pool);
        await AdminModel.initTable(pool);
    } catch (err) {
        console.error('Initialization failed:', err);
    }
}

app.listen(PORT, () => {
    console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
    init();
});
