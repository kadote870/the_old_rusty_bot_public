import express from 'express';
import sqlite3 from 'sqlite3';
import { DATA_BASE_PATH } from '../db/data-source';

const router = express.Router();

const db = new sqlite3.Database(DATA_BASE_PATH);

router.use(express.json());

router.get('/api/bank', (req, res) => {
   db.all(
      'SELECT id, userId, characterName, bankBalance FROM players',
      (err, row) => {
         if (err) {
            console.error('500 Internal Server Error:', err.message);
            res.status(500).json({ error: '500 Internal Server Error.' });
         } else {
            if (row) {
               res.json(row);
            } else {
               res.status(404).json({ error: '404 Not Found.' });
            }
         }
      }
   );
});

router.get('/api/bank/:userId', (req, res) => {
   const userId = req.params.userId;
   db.get(
      'SELECT id, userId, characterName, bankBalance FROM players WHERE userId = ?',
      [userId],
      (err, row) => {
         if (err) {
            console.error('500 Internal Server Error:', err.message);
            res.status(500).json({ error: '500 Internal Server Error.' });
         } else {
            if (row) {
               res.json(row);
            } else {
               res.status(404).json({ error: '404 Not Found.' });
            }
         }
      }
   );
});

router.patch('/api/bank/:userId', (req, res) => {
   const userId = req.params.userId;
   const updatedData = req.body;

   if (!updatedData || updatedData.bankBalance === undefined) {
      res.status(400).json({ error: 'Incorrect PATH data.' });
      return;
   }

   db.run(
      'UPDATE players SET bankBalance=? WHERE userId = ?',
      [updatedData.bankBalance, userId],
      function (err) {
         if (err) {
            console.error('500 Internal Server Error:', err.message);
            res.status(500).json({ error: '500 Internal Server Error.' });
         } else {
            if (this.changes > 0) {
               res.status(200).json({ message: '200 OK.' });
            } else {
               res.status(404).json({ error: '404 Not Found.' });
            }
         }
      }
   );
});

export default router;
