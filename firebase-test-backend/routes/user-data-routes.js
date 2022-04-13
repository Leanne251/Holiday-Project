import express from 'express';
import { saveSelectedHoliday, usersSavedTrips } from '../models/user-data-models.js';

const userRouter = express.Router();

userRouter.get('/:uid', async function(req, res) {
	const userID = req.params.uid;
	const usersSavedHolidays = await usersSavedTrips(userID);
	res.json({
		success: true,
		payload: usersSavedHolidays
	});
});

userRouter.post('/', async function(req, res) {
	try {
		const body = req.body;
		console.log('body', body);
		const savedHoliday = await saveSelectedHoliday(body);
		console.log('savedHoliday from post', savedHoliday);
		res.json({
			success: true,
			payload: savedHoliday
		});
	} catch (error) {
		res.json({ success: false, message: error });
	}
});

export default userRouter;
