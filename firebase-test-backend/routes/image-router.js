import express from 'express';
import { cloud } from '../src/config/firebase-config.js';
import cloudinary from 'cloudinary';

const imageRouter = express.Router();
console.log(cloud);

imageRouter.post('/', async (req, res) => {
	try {
		const fileStr = req.body.data;
		console.log('fileStr', fileStr);
		// const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {});
		// console.log('uploadedresponse', uploadedResponse);
		// res.json({
		// 	msg: 'YAY'
		// });
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'something went wrong' });
	}
});

export default imageRouter;
