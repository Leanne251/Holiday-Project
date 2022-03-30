import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginwithEmail({ authentication, setAuth }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await signInWithEmailAndPassword(authentication, email, password);
			const user = response.user;

			if (user) {
				setAuth(true);
				window.localStorage.setItem('auth', 'true');
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h5>Login</h5>
			<label>Your Email:</label>
			<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
			<label>Your Password:</label>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button onClick={handleSubmit}>LoginwithEmail</button>
		</div>
	);
}

export default LoginwithEmail;
