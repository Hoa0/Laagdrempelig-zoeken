// routes/catalogusRoute.js
import express from 'express';
import { getResults } from '../controllers/catalogusController.js';

const router = express.Router();

router.get('/search/:searchTerm/:facet', async (req, res) => {
    const { searchTerm, facet } = req.params;

    const results = await getResults(searchTerm, facet);
    res.json(results);
});

export default router;
