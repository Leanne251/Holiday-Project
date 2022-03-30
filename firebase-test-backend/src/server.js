import express from 'express';
import cors from 'cors';
import firebaseAuth from './middleware/index.js';

const app = express();
const port = 5000;

app.use(cors());

app.use(firebaseAuth);

app.get('/api/todos', (req, res) => {
	console.log('req.user', req.user.uid);

	return res.json({
		todos: [
			{
				title: 'Task1'
			},
			{
				title: 'Task2'
			},
			{
				title: 'Task3'
			}
		]
	});
});

app.listen(port, () => {
	console.log(`sever is running on ${port}`);
});
