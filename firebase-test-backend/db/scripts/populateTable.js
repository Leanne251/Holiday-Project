import { holidays } from '../../data/holiday-data.js';
import db from '../connection.js';

async function populateTable() {
	for (let i = 0; i < holidays.length; i++) {
		const destination = holidays[i].destination;
		const style = holidays[i].style;
		const hotel = holidays[i].hotel;
		const image = holidays[i].image;

		const response = await db.query(
			`INSERT INTO holidays(destination, style, hotel, image_URL) VALUES($1, $2, $3, $4 ) 
    RETURNING destination;`,
			[ destination, style, hotel, image ]
		);
		console.log(response);
	}
}

populateTable();
