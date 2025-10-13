import { Router, type Request, type Response } from 'express';
import type { CommonResponse } from './types';
import { query } from '../lib/db';
import type { Weather } from '../db/types';
import { isUnit, kToUnit } from '../lib/units';

/**
 * If candidates encounter issues with their routes not being hit, they 
 * may have registered them in the incorrect order. Routes are matched from 
 * top to bottom.
 * 
 * e.g. Incorrect
 * - /:date
 * - /forecast <- This will never get hit, /:date will be hit with a value of "forecast"
 * 
 * e.g. Correct
 * - /forecast <- Matched first
 * - /:date
 */

const router: Router = Router({ mergeParams: true });

router.get('/', async (_: Request, res: Response<CommonResponse<Weather[]>>) => {
  try {
    const sql = `SELECT * FROM weather`

    const allWeather = await query<Weather>(sql)

    res.status(200).json({
      error: null,
      data: allWeather
    })
  } catch (e: unknown) {
    res.status(500).json({
      error: e instanceof Error ? e.message : String(e),
      data: null
    })
  }
})

router.get('/forecast', async (req: Request, res: Response<CommonResponse<Weather[]>>) => {
  try {
    let sql = `SELECT * FROM weather`
    const { unit } = req.query

    /** 
     * Might need to help the candidate with converting 
     * the timestamp to a date for comparison
     */
    sql += " WHERE date(timestamp) <= ? AND time(timestamp) = ?"
    const params = ['2025-10-14', '12:00:00']

    const allWeather = await query<Weather>(sql, params)

    if (allWeather.length === 0) {
      res.status(404).json({ error: 'No data', data: null })
    }

    if (unit && typeof unit === 'string') {
      if (isUnit(unit)) {
        allWeather.forEach(w => {
          w.temp_min = kToUnit(w.temp_min, unit)
          w.temp_max = kToUnit(w.temp_max, unit)
        })
      }
    }

    res.status(200).json({
      error: null,
      data: allWeather
    })
  } catch (e: unknown) {
    res.status(500).json({
      error: e instanceof Error ? e.message : String(e),
      data: null
    })
  }
})

router.get('/by-date/:date', async (req: Request, res: Response<CommonResponse<Weather[]>>) => {
  try {
    const { date } = req.params
    const { unit } = req.query
    const params = []
    const dateRegex = /\d{4,4}\-\d{2,2}\-\d{2,2}/
    let sql = `SELECT * FROM weather`

    if (!date || !dateRegex.test(date)) {
      res.status(400).json({
        error: 'Invalid date provided',
        data: null
      })
      return
    }

    /** 
     * Might need to help the candidate with converting 
     * the timestamp to a date for comparison
     */
    sql += " WHERE date(timestamp) = ?"
    params.push(date)

    const allWeather = await query<Weather>(sql, params)

    if (allWeather.length === 0) {
      res.status(404).json({ error: 'No data', data: null })
    }

    if (unit && typeof unit === 'string') {
      if (isUnit(unit)) {
        allWeather.forEach(w => {
          w.temp_min = kToUnit(w.temp_min, unit)
          w.temp_max = kToUnit(w.temp_max, unit)
        })
      }
    }

    res.status(200).json({
      error: null,
      data: allWeather
    })
  } catch (e: unknown) {
    res.status(500).json({
      error: e instanceof Error ? e.message : String(e),
      data: null
    })
  }
})

export default router;

