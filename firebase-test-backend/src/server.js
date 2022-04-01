import express from 'express';
import cors from 'cors';
import firebaseAuth from './middleware/index.js';
import holidayRouter from '../routes/holiday-routes.js';
import router from '../routes/todos-routes.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(firebaseAuth);
app.use('/api/todos', router);
app.use('/holidays', holidayRouter);

app.listen(port, () => {
	console.log(`sever is running on ${port}`);
});
