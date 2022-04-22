import express from 'express';
import { cloud } from '../src/config/firebase-config.js';

const imageRouter = express.Router();
console.log(cloud);

imageRouter.post('/', (req, res) => {
	try {
		const fileStr = req.body.data;
		console.log('fileStr', fileStr);
		// const uploadedResponse = await cloud.uploader.upload(fileStr, {});
		// console.log('fileStr', fileStr);
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
