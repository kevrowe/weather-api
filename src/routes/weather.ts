import express from 'express';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.status(200).json({error: null, data: null})
})

export default router;
