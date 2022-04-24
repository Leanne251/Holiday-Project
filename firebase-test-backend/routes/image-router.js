import express from 'express';
import { cloud } from '../src/config/firebase-config.js';
import { v2 as cloudinary } from 'cloudinary';

const imageRouter = express.Router();
console.log(cloud);

imageRouter.post('/', async (req, res) => {
	try {
		const fileStr = req.body.data;
		console.log('fileStr', fileStr);
		const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'Holiday_Project'
		});
		console.log('uploadedresponse', uploadedResponse);
		console.log('uploadedresponse', uploadedResponse.url);
		console.log('uploadedresponse', uploadedResponse.secure_url);
		res.json({
			msg: 'YAY'
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'something went wrong' });
	}
});

export default imageRouter;

// req.body is my object that is sent from the front end
// i need a cloudinary_id: uploadedResponse.url
