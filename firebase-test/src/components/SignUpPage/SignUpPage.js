import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Heading, Box, Input, Button, HStack } from '@chakra-ui/react';

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
		<Box className="SignInBox" w="500px">
			<Heading as="h3" size="sm" p={4}>
				Sign-Up
			</Heading>
			<HStack>
				<label>Your Name:</label>
				<Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
			</HStack>
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
			<Button onClick={handleSubmit}>SignUp</Button>
		</Box>
	);
}

export default SignUpPage;
