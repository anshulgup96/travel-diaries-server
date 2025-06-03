import express from 'express';
import { connectToDatabase } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('comments');
    const results = await collection.find({}).limit(50).toArray();
    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to fetch comments');
  }
});

router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('comments');
    const newDocument = {
      ...req.body,
      date: new Date(),
    };
    const result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to post comment');
  }
});

export default router;
