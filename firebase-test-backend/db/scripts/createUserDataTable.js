import db from '../connection.js';

let SQLStr = `CREATE TABLE IF NOT EXISTS userHolidays (id SERIAL PRIMARY KEY, user_id TEXT, creation_date DATE, destination TEXT, style TEXT, image TEXT, hotel TEXT, cost INT, user_notes TEXT);`;

async function createUserDataTable() {
	const response = await db.query(SQLStr);
	console.log(response);
}

createUserDataTable();
db.end();
