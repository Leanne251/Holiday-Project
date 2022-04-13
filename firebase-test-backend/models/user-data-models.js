import db from '../db/connection.js';

export async function saveSelectedHoliday({ user_id, creation_date, destination, style, hotel }) {
	const result = await db.query(
		`INSERT INTO userHolidays (user_id, creation_date, destination, style, hotel) VALUES ($1, $2, $3, $4, $5) RETURNING destination;`,
		[ user_id, creation_date, destination, style, hotel ]
	);
	console.log(result.rows);
	return result.rows;
}

export async function usersSavedTrips(userID) {
	const result = await db.query(`SELECT * FROM userHolidays WHERE user_id=$1;`, [ userID ]);
	return result.rows;
}
