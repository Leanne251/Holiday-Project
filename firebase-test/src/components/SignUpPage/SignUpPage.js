import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function SignUpPage({ authentication, setAuth, setUserName }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ name, setName ] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await createUserWithEmailAndPassword(authentication, email, password);
			const user = response.user;
			if (user) {
				setAuth(true);
			}
		} catch (error) {
			console.log(error.code);
		}
		updateProfile(authentication.currentUser, {
			displayName: name
		})
			.then(() => {
				// Profile updated!
				// ...
			})
			.catch((error) => {
				// An error occurred
				// ...
			});
	}

	return (
		<div className="SignInBox">
			<h5>Sign-Up</h5>
			<label>Your Name:</label>
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
			<label>Your Email:</label>
			<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
			<label>Your Password:</label>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button onClick={handleSubmit}>SignUp</button>
		</div>
	);
}

export default SignUpPage;
