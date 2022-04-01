import express from 'express';
import { getAllHolidays, getSelectedHoliday, addAHoliday } from '../models/holiday-models.js';

const holidayRouter = express.Router();

holidayRouter.get('/', async function(req, res) {
	const destination = req.query.destination;

	if (destination) {
		const reqName = await getSelectedHoliday(destination);
		return res.json({
			payload: reqName
		});
	}
	const allHolidays = await getAllHolidays();

	res.json({
		success: true,
		payload: allHolidays
	});
});

holidayRouter.post('/', async function(req, res) {
	try {
		const body = req.body;
		const newHoliday = await addAHoliday(body);
		res.json({
			success: true,
			payload: newHoliday
		});
	} catch (error) {
		res.json({ success: false, message: error });
	}
});

// router.post('/', async function(req, res, next) {
// 	console.log('post request', req.body);
// 	try {
// 		const body = req.body;

// 		const create = await createData(body);

// 		res.json({
// 			success: true,
// 			payload: create
// 		});
// 	} catch (error) {
// 		res.json({ success: false, message: error });
// 	}
// });

export default holidayRouter;
