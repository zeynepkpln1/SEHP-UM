import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Setup storage
const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');

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

export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export class UploadController {
    static async handleUpload(req, res) {
        if (!req.file) return res.status(400).json({ error: 'Dosya yüklenemedi' });
        const publicPath = `/images/uploads/${req.file.filename}`;
        res.json({ success: true, url: publicPath });
    }
}
