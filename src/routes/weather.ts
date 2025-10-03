import express, { type Response } from 'express';
import type { CommonResponse } from './types';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res: Response<CommonResponse<null>>) => {
  res.status(200).json({
    error: null,
    data: null
  })
})

export default router;
