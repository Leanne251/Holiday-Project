import pg from 'pg';
import { connectionString } from '../src/config/firebase-config.js';

const db = new pg.Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false
	}
});

export default db;
// console.log('pool', pool);
// export default function query(text, params) {
// 	return pool.query(text, params);
// }

// same as just doing db.query()
