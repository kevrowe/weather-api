import express, { type Response } from 'express';
import type { CommonResponse } from './types';
import { query } from '../lib/db';
import type { Weather } from '../db/types';

const router = express.Router({ mergeParams: true });

router.get('/', async (_: any, res: Response<CommonResponse<Weather[]>>) => {
  try {
    const allWeather = await query<Weather>('SELECT * FROM weather')

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
