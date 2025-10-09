import db from './index';
import fs from 'fs';
import path from 'path';

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherEntry {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  pop: number;
}

interface TestData {
  weather: WeatherEntry[];
}

export function seedDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Read test data
    const testDataPath = path.join(process.cwd(), 'test_data.json');
    const testData: TestData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

    // Check if data already exists
    db.get('SELECT COUNT(*) as count FROM weather', (err, row: any) => {
      if (err) {
        console.error('Error checking existing data:', err);
        reject(err);
        return;
      }

      if (row.count > 0) {
        console.log('Database already seeded, skipping...');
        resolve();
        return;
      }

      // Extract unique conditions
      const conditionsMap = new Map<number, WeatherCondition>();
      testData.weather.forEach(entry => {
        entry.weather.forEach(condition => {
          if (!conditionsMap.has(condition.id)) {
            conditionsMap.set(condition.id, condition);
          }
        });
      });

      db.serialize(() => {
        // Insert conditions
        const conditionStmt = db.prepare('INSERT INTO conditions (id, name, description, icon) VALUES (?, ?, ?, ?)');

        conditionsMap.forEach(condition => {
          conditionStmt.run(condition.id, condition.main, condition.description, condition.icon);
        });

        conditionStmt.finalize();

        // Insert weather data
        const weatherStmt = db.prepare(`
          INSERT INTO weather (timestamp, temp_min, temp_max, feels_like, pressure, humidity, conditions, wind_speed, wind_degrees, wind_gust, precipitation)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        testData.weather.forEach(entry => {
          const windGust = entry.wind.gust || 0;
          const conditionId = entry.weather[0]!.id;

          weatherStmt.run(
            entry.dt,
            entry.main.temp_min,
            entry.main.temp_max,
            entry.main.feels_like,
            entry.main.pressure,
            entry.main.humidity,
            conditionId,
            entry.wind.speed,
            entry.wind.deg,
            windGust,
            entry.pop
          );
        });

        weatherStmt.finalize((err) => {
          if (err) {
            console.error('Error seeding database:', err);
            reject(err);
            return;
          }
          console.log('Database seeded successfully');
          resolve();
        });
      });
    });
  });
}
