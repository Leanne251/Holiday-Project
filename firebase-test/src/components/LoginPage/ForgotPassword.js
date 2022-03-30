import { useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

function ForgotPassword() {
	const auth = getAuth();
	const [ email, setEmail ] = useState('');
	const sendPasswordReset = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
			alert('Password reset link sent!');
		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	};

	return (
		<div>
			<input type="email" value={email} placeholder="E-mail Address" onChange={(e) => setEmail(e.target.value)} />
			<button onClick={() => sendPasswordReset(email)}>Send password reset email</button>
			<button>
				<Link to="/">Back</Link>
			</button>
		</div>
	);
}

export default ForgotPassword;
