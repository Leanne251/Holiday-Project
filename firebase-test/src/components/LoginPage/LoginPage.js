import { useState } from 'react';
import LoginwithEmail from './LoginwithEmail';
import SignUpPage from '../SignUpPage/SignUpPage';
import { LoginWithGoogle } from './LoginWithGoogle';
import { Link } from 'react-router-dom';
import { Box, Center, Button, Heading } from '@chakra-ui/react';

function LoginPage({ authentication, setAuth, setToken, setUserName }) {
	const [ toggleLogin, setToggleLogin ] = useState(false);

	function toggle() {
		setToggleLogin(!toggleLogin);
	}

	return (
		<Center>
			<Box>
				{toggleLogin ? (
					<Box className="flexBox">
						<Button onClick={toggle} m={4}>
							<Heading p={4} as="h3" size="sm">
								SignUp
							</Heading>
						</Button>
						<LoginwithEmail authentication={authentication} setAuth={setAuth} />
						<Button m={4}>
							<Link to="/forgotpassword">Forgot Password</Link>
						</Button>
						<LoginWithGoogle authentication={authentication} setAuth={setAuth} />
					</Box>
				) : (
					<Box className="flexBox">
						<Button onClick={toggle}>Login</Button>
						<SignUpPage
							authentication={authentication}
							setAuth={setAuth}
							setToken={setToken}
							setUserName={setUserName}
						/>
					</Box>
				)}
			</Box>
		</Center>
	);
}

export default LoginPage;
