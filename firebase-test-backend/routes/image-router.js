import express from 'express';
import cloud from '../utiles/cloudinary.js';

const imageRouter = express.Router();

imageRouter.post('/', async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'dev_setups'
		});
		console.log('fileStr', fileStr);
		console.log('uploadedresponse', uploadedResponse);
		res.json({
			msg: 'YAY'
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'something went wrong' });
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
