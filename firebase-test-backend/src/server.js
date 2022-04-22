import express from 'express';
import cors from 'cors';
import firebaseAuth from './middleware/index.js';
import holidayRouter from '../routes/holiday-routes.js';
import router from '../routes/todos-routes.js';
import userRouter from '../routes/user-data-routes.js';
import imageRouter from '../routes/image-router.js';

const app = express();
// const port = 5000;

const port = process.env.PORT || '5000';
// const port = '5000';
// app.set('port', port);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(firebaseAuth);
app.use('/api/todos', router);
app.use('/holidays', holidayRouter);
app.use('/users', userRouter);
app.use('/upload', imageRouter);

app.listen(port, () => {
	console.log(`sever is running on ${port}`);
});
