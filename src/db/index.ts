import sqlite3 from 'sqlite3';
import { initializeDatabase } from './initDb';
import { seedDatabase } from './seedDb';

let db: sqlite3.Database = {} as any;
let dbReady: Promise<void>;

dbReady = new Promise((resolve, reject) => {
  db = new sqlite3.Database(':memory:', async (err) => {
    if (err) {
      console.error('Error opening database:', err);
      reject(err);
      return;
    }
    console.log('Connected to in-memory SQLite database');

    try {
      await initializeDatabase();
      await seedDatabase();
      resolve();
    } catch (error) {
      console.error('Error initializing/seeding database:', error);
      reject(error);
    }
  });
});

sqlite3.verbose();

export { dbReady };
export default db;
