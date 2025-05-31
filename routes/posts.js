import express from 'express';
import db from '../db/conn.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  let collection = await db.collection('comments');
  let results = await collection.find({}).limit(50).toArray();
  console.log(results);
  res.send(results).status(200);
});

// Add a new document to the collection
router.post('/', async (req, res) => {
  let collection = await db.collection('comments');
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

export default router;
