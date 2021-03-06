import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from '@chakra-ui/react';

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

	return (
		<Button m={4} onClick={handleLogOut}>
			Log Out
		</Button>
	);
}

export default LogOut;
