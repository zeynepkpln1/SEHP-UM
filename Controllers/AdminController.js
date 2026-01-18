import { connectToDb } from '../Models/db.js';
import { AdminModel } from '../Models/AdminModel.js';

export class AdminController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const pool = await connectToDb();
            const success = await AdminModel.login(pool, email, password);

            if (success) res.json({ success: true, user: { email } });
            else res.status(401).json({ success: false, message: 'Geçersiz bilgiler' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Sunucu hatası' });
        }
    }
}
