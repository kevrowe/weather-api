import db from './index';

export function initializeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS conditions (
          id INTEGER PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          icon VARCHAR(5) NOT NULL
        )
      `, (err: unknown) => {
        if (err) {
          console.error('Error creating conditions table:', err);
          reject(err);
          return;
        }
      });

      db.run(`
        CREATE TABLE IF NOT EXISTS weather (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp INTEGER NOT NULL,
          temp_min REAL NOT NULL,
          temp_max REAL NOT NULL,
          feels_like REAL NOT NULL,
          pressure REAL NOT NULL,
          humidity REAL NOT NULL,
          conditions INTEGER NOT NULL,
          wind_speed REAL NOT NULL,
          wind_degrees REAL NOT NULL,
          wind_gust REAL NOT NULL,
          precipitation REAL NOT NULL,
          FOREIGN KEY (conditions) REFERENCES conditions(id)
        )
      `, (err: unknown) => {
        if (err) {
          console.error('Error creating weather table:', err);
          reject(err);
          return;
        }
        console.log('Database tables initialized');
        resolve();
      });
    });
  });
}
