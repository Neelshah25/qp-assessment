import express from 'express';
import db from '../db';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// View available groceries
router.get('/groceries', authenticate, authorize(['user', 'admin']), async (req, res) => {
    console.log('Fetching available groceries');
    try {
        const rows = await db.query('SELECT * FROM groceries WHERE quantity > 0 AND isDeleted = 0');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Place an order
router.post('/orders', authenticate, authorize(['user', 'admin']), async (req, res) => {
    console.log('Placing an order');
    const { userId, items } = req.body; // items = [{ groceryId, quantity }]
    try {
        const [orderResult]: any = await db.query(
            'INSERT INTO orders (userId) OUTPUT INSERTED.id VALUES (?)',
            [userId]
        );

        const orderId = orderResult.id

        for (const item of items) {
            await db.query(
                'INSERT INTO order_items (orderId, groceryId, quantity) VALUES (?, ?, ?)',
                [orderId, item.groceryId, item.quantity]
            );

            await db.query(
                'UPDATE groceries SET quantity = quantity - ? WHERE id = ?',
                [item.quantity, item.groceryId]
            );
        }

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

export default router;
