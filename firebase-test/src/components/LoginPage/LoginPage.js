import { useState } from 'react';
import LoginwithEmail from './LoginwithEmail';
import SignUpPage from '../SignUpPage/SignUpPage';
import { LoginWithGoogle } from './LoginWithGoogle';
import { Link } from 'react-router-dom';

function LoginPage({ authentication, setAuth, setToken, setUserName }) {
	const [ toggleLogin, setToggleLogin ] = useState(false);

	function toggle() {
		setToggleLogin(!toggleLogin);
	}

	return (
		<div>
			{toggleLogin ? (
				<div className="flexBox">
					<button onClick={toggle}>SignUp</button>
					<LoginwithEmail authentication={authentication} setAuth={setAuth} />
					<button>
						<Link to="/forgotpassword">Forgot Password</Link>
					</button>
					<LoginWithGoogle authentication={authentication} setAuth={setAuth} />
				</div>
			) : (
				<div className="flexBox">
					<button onClick={toggle}>Login</button>
					<SignUpPage
						authentication={authentication}
						setAuth={setAuth}
						setToken={setToken}
						setUserName={setUserName}
					/>
				</div>
			)}
		</div>
	);
}

export default LoginPage;
