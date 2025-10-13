import express, { type Request, type Response } from 'express';
import type { CommonResponse } from './types';
import { query } from '../lib/db';
import type { Weather } from '../db/types';

const router = express.Router({ mergeParams: true });

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

router.get('/:date', async (req: Request, res: Response<CommonResponse<Weather[]>>) => {
    try {
    const {date} = req.params
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

    sql += " WHERE date(timestamp) = ?"
    params.push(date)

    const allWeather = await query<Weather>(sql, params)

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
