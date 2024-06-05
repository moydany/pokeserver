import express from 'express';
import { helloWorld, healthCheck } from '../controllers/healthController';

const router = express.Router();

router.get('/hello', helloWorld);
router.get('/healthcheck', healthCheck);

export default router;
