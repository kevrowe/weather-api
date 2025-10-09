import express, { type Response } from 'express';
import type { CommonResponse } from './types';
import { query } from '../lib/db';

const router = express.Router({ mergeParams: true });

router.get('/', async (_: any, res: Response<CommonResponse<any>>) => {
  try {
    const allWeather = await query('SELECT * FROM weather')

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
