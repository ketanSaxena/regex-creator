import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  if (!process.env.MONGO_URL) {
    throw new Error('Please define the MONGO_URL environment variable inside .env.local');
  }

  const client = new MongoClient(process.env.MONGO_URL);

  await client.connect();

  const db = client.db(); // Use the default database or specify the database name here
  cachedClient = client;
  cachedDb = db;

  return db;
}
