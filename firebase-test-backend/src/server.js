import express from 'express';
import cors from 'cors';
import firebaseAuth from './middleware/index.js';
import holidayRouter from '../routes/holiday-routes.js';
import router from '../routes/todos-routes.js';
import userRouter from '../routes/user-data-routes.js';
import cool from 'cool-ascii-faces';
import imageRouter from '../routes/image-router.js';
import cloudinary from 'cloudinary';

const app = express();
// const port = 5000;

console.log('i', imageRouter);
console.log('i', userRouter);

const port = process.env.PORT || '5000';
// const port = '5000';
// app.set('port', port);
app.get('/cool', (req, res) => res.send(cool()));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(firebaseAuth);
app.use('/api/todos', router);
app.use('/holidays', holidayRouter);
app.use('/users', userRouter);
app.use('/upload', imageRouter);

app.get('/images', async (req, res) => {
	const { resources } = await cloudinary.search
		.expression('folder:Holiday_Project')
		.sort_by('public_id', 'desc')
		.max_results(30)
		.execute();
	const publicIDs = resources.map((file) => file.public_id);
	res.send(publicIDs);
});

app.listen(port, () => {
	console.log(`sever is running on ${port}`);
});

console.log('The value of PORT is:', process.env.PORT);
console.log(process.env.NODE_ENV);
