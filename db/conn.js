import { MongoClient } from 'mongodb';

const uri = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME || 'sample_mflix';

if (!uri) {
  throw new Error('Missing ATLAS_URI in environment variables');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return db;
}
