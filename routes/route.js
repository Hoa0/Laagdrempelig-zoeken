import express from 'express';
import { fetchData } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', fetchData);

router.post('/search', fetchData);

export default router;