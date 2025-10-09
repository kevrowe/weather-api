import db from '../db/index'

/**
 * Execute a query on the database
 * @param query SQL query string
 * @returns Data rows
 */
const query = async (sql: string) => {
  return await new Promise((res, rej) => {
    db.all(sql, (err: any, rows: any) => {
      if (err) rej(err)
      else res(rows)
    })
  })
}

export { query }