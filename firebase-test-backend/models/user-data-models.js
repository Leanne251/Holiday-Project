import db from '../db/connection.js';

export async function saveSelectedHoliday({ user_id, destination, style, hotel }) {
	const result = await db.query(
		`INSERT INTO userHolidays (user_id, destination, style, hotel) VALUES ($1, $2, $3, $4) RETURNING destination;`,
		[ user_id, destination, style, hotel ]
	);
	console.log(result.rows);
	return result.rows;
}
