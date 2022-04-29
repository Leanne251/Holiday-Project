import React from 'react';
import ReactDOM from 'react-dom';
import { app } from './firebaseConfig';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import '@fontsource/rubik';
import '@fontsource/karla';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ChakraProvider>,
	document.getElementById('root')
);
