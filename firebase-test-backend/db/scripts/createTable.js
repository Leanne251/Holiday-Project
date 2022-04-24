import db from '../connection.js';

let SQLStr = `CREATE TABLE IF NOT EXISTS holidays (id SERIAL PRIMARY KEY, user_id TEXT, creation_date DATE, destination TEXT, style TEXT, cloudinary_id TEXT, image_URL TEXT, image TEXT, hotel TEXT, cost INT);`;

async function createTable() {
	const response = await db.query(SQLStr);
	console.log(response);
}

createTable();
db.end();
