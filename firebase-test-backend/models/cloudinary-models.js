import db from '../db/connection.js';

export async function insertCloudinary({ user_id, destination, style, cloudinary_id, image_url, hotel }) {
	const result = await db.query(
		`INSERT INTO holidays (user_id, destination, style, cloudinary_id, image_url, hotel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING destination;`,
		[ user_id, destination, style, hotel, cloudinary_id, image_url ]
	);
}
