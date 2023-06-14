import express from 'express';
import { fetchData } from '../controllers/homeController.js';

const router = express.Router();

// const apiController = require('../controllers/apiController');

// in /api/example
// router
//     .route('/example/')
//     .get(apiController.getExample)
//     .post(apiController.postExample);

// .post(object.function-in-the-object)
// router.route('/search/').post(apiController.search);

// GET route
router.get('/', fetchData);

router.post('/search', fetchData);

export default router;