import NavBar from '../NavBar/NavBar';
import LogOut from '../LogOut/LogOut';
import Dashboard from '../Dashboard/Dashboard';
import LoginPage from '../LoginPage/LoginPage';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

function Home() {
	const authentication = getAuth();
	const [ auth, setAuth ] = useState(false || window.localStorage.getItem('auth') === 'true');
	console.log('authentication', authentication);
	const [ token, setToken ] = useState();
	const [ userName, setUserName ] = useState('');
	const [ uid, setUid ] = useState('');

	useEffect(
		() => {
			const unsubscribe = onAuthStateChanged(authentication, async (user) => {
				if (user) {
					console.log('user app page', user);
					setAuth(true);
					window.localStorage.setItem('auth', 'true');
					const userToken = await user.getIdToken();
					sessionStorage.setItem('Auth Token', userToken);
					console.log('userToken app page', userToken); // accessToken
					console.log('user.id', user.uid); // uid
					setToken(userToken);
					setUserName(user.displayName);
					setUid(user.uid);
				}
			});
			return unsubscribe;
		},
		[ authentication ]
	);

	return (
		<div>
			{auth ? (
				<div>
					<NavBar />
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

export default Home;
