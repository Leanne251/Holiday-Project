import express from 'express';
const router = express.Router();
import { result } from '../models/holiday-models.js';

router.get('/', (req, res) => {
	console.log('req.user', req.user.uid);

	return res.json({
		todos: 'yes',
		result: result
	});
});

export default router;
