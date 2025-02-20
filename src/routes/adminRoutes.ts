import express from 'express';
import db from '../db';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Add new grocery item
router.post('/groceries', authenticate, authorize(['admin']), async (req, res) => {
    console.log('Adding new grocery item');
    const { name, price, quantity } = req.body;
    console.log('Received data:', { name, price, quantity });
    try {
        await db.query(
            'INSERT INTO groceries (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );
        res.status(201).json({ message: 'Grocery item added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error', err });
    }
});

// View all grocery items
router.get('/groceries', authenticate, authorize(['admin']), async (req, res) => {
    try {
        console.log('Fetching all grocery items');
        const rows = await db.query('SELECT * FROM groceries');
        // console.log('Fetched rows:', rows);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error', err });
    }
});

// Get grocery item by Id
router.get('/groceries/:id', authenticate, authorize(['admin']), async (req, res) => {
    console.log('Fetching grocery item by id');
    const { id } = req.params;
    try {
        const [result] = await db.query(
            'SELECT * FROM groceries WHERE id = ?',
            [id]
        );
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Update grocery item
router.put('/groceries/:id', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    try {
        console.log('Updating grocery item with id:', id);
        await db.query(
            'UPDATE groceries SET name = ?, price = ?, quantity = ? WHERE id = ?',
            [name, price, quantity, id]
        );
        res.json({ message: 'Grocery item updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Remove grocery item
router.delete('/groceries/:id', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
        console.log('Removing grocery item with id:', id);
        // await db.query('DELETE FROM groceries WHERE id=?', [id]);
        await db.query('UPDATE groceries SET isDeleted = 1 WHERE id = ?', [id]);

        res.json({ message: 'Grocery item removed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

export default router;



