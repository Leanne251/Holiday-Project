import db from '../db/connection.js';

export async function saveSelectedHoliday({ userId, creationDate, destination, style, hotel, image }) {
	const result = await db.query(
		`INSERT INTO userHolidays (userId, creationDate, destination, style, hotel, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING destination;`,
		[ userId, creationDate, destination, style, hotel, image ]
	);
	console.log(result.rows);
	return result.rows;
}

export async function usersSavedTrips(userID) {
	const result = await db.query(`SELECT * FROM userHolidays WHERE user_id=$1;`, [ userID ]);
	return result.rows;
}
