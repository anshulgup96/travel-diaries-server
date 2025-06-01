import express from 'express';
import db from '../db/conn.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  const name = req.query.name;
  const collection = db.collection('users');
  const results = await collection.findOne({ name });
  res.cookie('cookie', 'cookieValue', {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    sameSite: 'lax',
  });
  res.status(200).send(results);
});

export default router;
