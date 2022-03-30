import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export function LoginWithGoogle({ setAuth, authentication }) {
	async function handleGoogleSignIn() {
		try {
			const response = await signInWithPopup(authentication, provider);
			const user = response.user;
			if (user) {
				setAuth(true);
				window.localStorage.setItem('auth', 'true');
			}
			console.log('user', user);
		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	}

	return <button onClick={handleGoogleSignIn}>Login With Google</button>;
}
