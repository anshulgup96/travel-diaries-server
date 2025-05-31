import express from 'express';
import db from '../db/conn.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  const name = req.query.name;
  const collection = db.collection('users');
  const results = await collection.findOne({ name });
  res.status(200).send(results);
});

export default router;
