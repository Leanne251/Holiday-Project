import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

function LogOut({ setAuth }) {
	// sessionStorage.removeItem('Auth Token');

	function handleLogOut() {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				window.localStorage.setItem('auth', 'false');
				setAuth(false);
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	}

	return <button onClick={handleLogOut}>Log Out</button>;
}

export default LogOut;
