import express from 'express';
import { getAllHolidays, getSelectedHoliday, addAHoliday, usersOwnHolidays } from '../models/holiday-models.js';
import { cloud } from '../src/config/firebase-config.js';
import { v2 as cloudinary } from 'cloudinary';

const holidayRouter = express.Router();

holidayRouter.get('/', async function(req, res) {
	console.log('holidays');
	const destination = req.query.destination;
	const uid = req.user.uid; // every call has this

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

holidayRouter.get('/:uid', async function(req, res) {
	const userID = req.params.uid;
	console.log('userID', userID);

	const usersAddedHolidays = await usersOwnHolidays(userID);
	res.json({
		success: true,
		payload: usersAddedHolidays
	});
});

holidayRouter.post('/', async function(req, res) {
	try {
		const { user_id, destination, style, hotel, image } = req.body;
		const uploadedResponse = await cloudinary.uploader.upload(image, {
			upload_preset: 'Holiday_Project'
		});
		const imageURL = uploadedResponse.url;
		const response = addAHoliday(user_id, destination, style, hotel, imageURL);
		res.json({
			success: true,
			payload: response
		});
	} catch (error) {
		res.json({ success: false, message: error });
	}
});

// const { destination, style, hotel, image } = req.body;
// 		const uploadedResponse = await cloudinary.uploader.upload(image, {
// 			upload_preset: 'Holiday_Project'
// 		});
// 		const imageURL = uploadedResponse.url;
// 		const response = postAHoliday(destination, style, hotel, imageURL);
// 		res.json({
// 			success: true,
// 			payload: response

export default holidayRouter;
