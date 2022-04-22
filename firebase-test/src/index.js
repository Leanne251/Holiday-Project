import React from 'react';
import ReactDOM from 'react-dom';
import { app } from './firebaseConfig';
import App from './App';
import ForgotPassword from './components/LoginPage/ForgotPassword';
import BucketList from './components/BucketList/BucketList';
import AddAHoliday from './components/AddAHoliday/AddAHoliday';
import NavBar from './components/NavBar/NavBar';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import '@fontsource/karla';
import '@fontsource/rubik';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			{/* <NavBar /> */}
			<Routes>
				<Route exact path="/forgotpassword" element={<ForgotPassword />} />
				<Route exact path="/" element={<App />} />
				<Route exact path="/addaholiday" element={<AddAHoliday />} />
				<Route exact path="/bucketlist" element={<BucketList />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>,
	document.getElementById('root')
);
