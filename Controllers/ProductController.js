import { connectToDb } from '../Models/db.js';
import { ProductModel } from '../Models/ProductModel.js';

export class ProductController {
    static async getAll(req, res) {
        try {
            const pool = await connectToDb();
            const result = await ProductModel.getAll(pool);
            res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Sunucu hatası' });
        }
    }

    static async create(req, res) {
        try {
            const pool = await connectToDb();
            await ProductModel.create(pool, req.body);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Hata' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const pool = await connectToDb();
            await ProductModel.update(pool, id, req.body);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Hata' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const pool = await connectToDb();
            await ProductModel.delete(pool, id);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Hata' });
        }
    }
}
