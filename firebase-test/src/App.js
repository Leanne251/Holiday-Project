import './App.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import LogOut from './components/LogOut/LogOut';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
	const authentication = getAuth();
	const [ auth, setAuth ] = useState(false || window.localStorage.getItem('auth') === 'true');
	console.log('auth from home', auth);
	const [ token, setToken ] = useState();
	const [ userName, setUserName ] = useState('');
	// const [ uid, setUid ] = useState('');

	useEffect(
		() => {
			const unsubscribe = onAuthStateChanged(authentication, async (user) => {
				if (user) {
					console.log('user app', user);
					setAuth(true);
					window.localStorage.setItem('auth', 'true');
					const userToken = await user.getIdToken();
					sessionStorage.setItem('Auth Token', userToken);
					console.log('userToken app page', userToken); // accessToken
					console.log('user.id', user.uid); // uid
					setToken(userToken);
					setUserName(user.displayName);
					// setUid(user.uid);
				}
			});
			return unsubscribe;
		},
		[ authentication ]
	);

	return (
		<div className="App">
			{auth ? (
				<div>
					<Dashboard token={token} userName={userName} />

					<LogOut setAuth={setAuth} />
				</div>
			) : (
				<LoginPage
					authentication={authentication}
					setAuth={setAuth}
					setToken={setToken}
					setUserName={setUserName}
				/>
			)}
		</div>
	);
}

export default App;
