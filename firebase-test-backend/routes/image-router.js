import express from 'express';

const imageRouter = express.Router();

imageRouter.post('/', (req, res) => {
	try {
		console.log(req.body);
		const fileStr = req.body.data;
		console.log(fileStr);
	} catch (err) {
		console.error(err);
	}
});

// holidayRouter.post('/', async function(req, res) {
// 	try {
// 		const body = req.body;
// 		const newHoliday = await addAHoliday(body);
// 		res.json({
// 			success: true,
// 			payload: newHoliday
// 		});
// 	} catch (error) {
// 		res.json({ success: false, message: error });
// 	}
// });

export default imageRouter;