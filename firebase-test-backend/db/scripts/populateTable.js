import { holidays } from '../../data/holiday-data.js';
import db from '../connection.js';

async function populateTable() {
	for (let i = 0; i < holidays.length; i++) {
		const destination = holidays[i].destination;
		const style = holidays[i].style;
		const image = holidays[i].image;
		const hotel = holidays[i].hotel;
		const cost = holidays[i].cost;

		const response = await db.query(
			`INSERT INTO holidays(destination, style, image, hotel, cost) VALUES($1, $2, $3, $4, $5) 
    RETURNING destination;`,
			[ destination, style, image, hotel, cost ]
		);
		console.log(response);
	}
}

populateTable();
