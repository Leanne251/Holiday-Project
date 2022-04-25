import './App.css';
import React from 'react';
import Home from './components/Home/Home';
import ForgotPassword from './components/LoginPage/ForgotPassword';
import BucketList from './components/BucketList/BucketList';
import AddAHoliday from './components/AddAHoliday/AddAHoliday';
import { Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export let fireBaseWrapper = React.createContext();

function App() {
	const authentication = getAuth();

	return (
		<div className="App">
			<fireBaseWrapper.Provider value={authentication}>
				<Routes>
					<Route exact path="/forgotpassword" element={<ForgotPassword />} />
					<Route exact path="/" element={<Home />} />
					<Route exact path="/addaholiday" element={<AddAHoliday />} />
					<Route exact path="/bucketlist" element={<BucketList />} />
				</Routes>
			</fireBaseWrapper.Provider>
		</div>
	);
}

export default App;
