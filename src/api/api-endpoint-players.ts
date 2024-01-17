import express from 'express';
import sqlite3 from 'sqlite3';
import {DATA_BASE_PATH} from "../db/data-source";

const router = express.Router();

const db = new sqlite3.Database(DATA_BASE_PATH);

router.use(express.json());

router.get('/api/players', (req, res) => {
    db.all('SELECT * FROM players', (err, rows) => {
        if (err) {
            console.error('500 Internal Server Error:', err.message);
            res.status(500).json({error: '500 Internal Server Error.'});
        } else {
            res.json(rows);
        }
    });
});

export default router;