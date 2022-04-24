import db from '../db/connection.js';
// import { cloud } from '../src/config/firebase-config.js';
import { v2 as cloudinary } from 'cloudinary';

export const result = {
	yes: 'please'
};

export async function getAllHolidays() {
	try {
		const result = await db.query(`SELECT * FROM holidays;`);

		return result.rows;
	} catch (e) {
		console.log('error', e);
	}
}

export async function getSelectedHoliday(destination) {
	const result = await db.query(`SELECT * FROM holidays WHERE destination ILIKE '%' || $1 || '%';`, [ destination ]);
	return result.rows;
}
export async function usersOwnHolidays(userID) {
	const result = await db.query(`SELECT * FROM holidays WHERE user_id=$1;`, [ userID ]);
	return result.rows;
}

export async function addAHoliday({ user_id, destination, style, hotel, image }) {
	const uploadedResponse = await cloudinary.uploader.upload(image, {
		upload_preset: 'Holiday_Project'
	});
	const cloudinary_url = uploadedResponse.url;
	const result = await db.query(
		`INSERT INTO holidays (user_id, destination, style, hotel, cloudinary_url) VALUES ($1, $2, $3, $4, $5) RETURNING destination;`,
		[ user_id, destination, style, hotel, cloudinary_url ]
	);

	return result.rows;
}

// export async function createData({ date, title, category, description, duration, userid }) {
// 	const data = await db.query(
// 		`INSERT INTO activities(date, title, category, description, duration, userid, isComplete) VALUES($1, $2, $3, $4, $5, $6, $7)
//     RETURNING title;`,
// 		[ date, title, category, description, duration, userid, false ]
// 	);

// 	return data.rows;
// }
