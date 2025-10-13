import { Router, type Request, type Response } from 'express';
import type { CommonResponse } from './types';
import { query } from '../lib/db';
import type { Weather } from '../db/types';

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

export default router;
