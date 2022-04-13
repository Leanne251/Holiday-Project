import React from 'react';
import ReactDOM from 'react-dom';
import { app } from './firebaseConfig';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ForgotPassword from './components/LoginPage/ForgotPassword';
import BucketList from './components/BucketList/BucketList';
import AddAHoliday from './components/AddAHoliday/AddAHoliday';
import NavBar from './components/NavBar/NavBar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<NavBar />
		<Routes>
			<Route exact path="/forgotpassword" element={<ForgotPassword />} />
			<Route exact path="/" element={<App />} />
			<Route exact path="/addaholiday" element={<AddAHoliday />} />
			<Route exact path="/bucketlist" element={<BucketList />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
