import './App.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import ListOfTodo from './components/ListOfTodo/ListOfTodo';
import LogOut from './components/LogOut/LogOut';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
	const authentication = getAuth();
	const [ auth, setAuth ] = useState(false || window.localStorage.getItem('auth') === 'true');
	const [ token, setToken ] = useState();
	const [ userName, setUserName ] = useState('');
	// const [ user, loading, error ] = useAuthState(auth);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(authentication, async (user) => {
			if (user) {
				console.log('user app', user);
				setAuth(true);
				window.localStorage.setItem('auth', 'true');
				const userToken = await user.getIdToken();
				console.log('userToken app page', userToken); // accessToken
				console.log('user.id', user.uid); // uid
				setToken(userToken);
				setUserName(user.displayName);
			}
		});
		return unsubscribe;
	}, []);

	// const navigate = useNavigate();
	// useEffect(
	// 	() => {
	// 		if (auth) navigate('/dashboard');
	// 	},
	// 	[ auth ]
	// );

	return (
		<div className="App">
			{auth ? (
				<div>
					{userName === null ? null : <h3>Hello {userName}</h3>}

					<Dashboard />
					<ListOfTodo token={token} />
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
