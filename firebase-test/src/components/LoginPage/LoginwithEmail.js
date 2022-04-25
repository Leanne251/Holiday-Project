import { useState } from 'react';
import { Button, Box, Center, VStack, HStack, Heading, Input } from '@chakra-ui/react';
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
		<Center>
			<Box p={8} border="1px solid black">
				<VStack alignItems="flex-start">
					<Heading alignSelf="center" as="h6" size="sm">
						Login
					</Heading>
					<HStack>
						<label>Your Email:</label>
						<Input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="E-mail Address"
						/>
					</HStack>
					<HStack>
						<label>Your Password:</label>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
					</HStack>
					<Button alignSelf="center" p={4} onClick={handleSubmit}>
						LoginwithEmail
					</Button>
				</VStack>
			</Box>
		</Center>
	);
}

export default LoginwithEmail;
