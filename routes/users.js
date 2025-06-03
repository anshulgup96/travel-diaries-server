import express from 'express';
import { connectToDatabase } from '../db/conn.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const name = req.query.name;
    const collection = db.collection('users');
    const result = await collection.findOne({ name });

    res.cookie('cookie', 'cookieValue', {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error fetching user');
  }
});

export default router;
