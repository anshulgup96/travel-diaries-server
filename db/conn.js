import { MongoClient } from 'mongodb';

const uri = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME || 'sample_mflix';

if (!uri) {
  throw new Error('Missing ATLAS_URI');
}

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
  });

  await client.connect();
  const db = client.db(dbName);
  cachedDb = db;
  return db;
}
