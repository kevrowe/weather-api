import db from '../db/index'

/**
 * Execute a query on the database
 * @param sql SQL query string
 * @returns Data rows
 */
const query = async <T = any>(sql: string, params: string[] = []): Promise<T[]> => {
  return await new Promise((res, rej) => {
    db.all(sql, params, (err: any, rows: any) => {
      if (err) rej(err)
      else res(rows)
    })
  })
}

export { query }