import { useContext } from 'react';
import { fireBaseWrapper } from '../../App';
import { Heading, Box, Image, Badge, Button, Center, VStack } from '@chakra-ui/react';

function HolidayCard({ holidayInfo }) {
	let firebase = useContext(fireBaseWrapper);
	let userID = firebase.currentUser.uid;

	console.log('holidayInfo', holidayInfo);

	const sendObj = {
		userId: userID,
		creationDate: new Date(),
		destination: holidayInfo.destination,
		style: holidayInfo.style,
		hotel: holidayInfo.hotel,
		image: holidayInfo.image
	};

	function sendToBucketList(e) {
		e.preventDefault();
		postTheData();
	}

	async function postTheData() {
		console.log('sendObj', sendObj);
		let authToken = sessionStorage.getItem('Auth Token');
		console.log('authToken from HolidayCard', authToken);
		const response = await fetch('https://april-firebase.herokuapp.com/users/', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authToken
			},
			body: JSON.stringify(sendObj)
		});
		console.log('response to Holiday Card', response);
	}

	console.log(sendObj);

	return (
		<Center>
			<Box maxW="md" borderWidth="2px" borderRadius="lg" overflow="hidden" m={4} p={6}>
				<Box p="3">
					<Box display="flex" alignItems="baseline">
						<Badge borderRadius="full" px="5" colorScheme="teal">
							New
						</Badge>
						<Box
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="md"
							textTransform="uppercase"
							ml="2"
						>
							Luxury Stay!
						</Box>
					</Box>
					<Center>
						<VStack>
							<Image
								boxSize="200px"
								objectFit="cover"
								src={holidayInfo.image_url}
								alt={holidayInfo.destination}
							/>

							<Heading as="h3" size="md">
								{holidayInfo.destination}
							</Heading>
							<p> {holidayInfo.style}</p>
							<p>{holidayInfo.hotel}</p>
						</VStack>
					</Center>
					<Center>
						<Button
							p={3}
							m={3}
							isAttached
							varient="outline"
							colorScheme="teal"
							onClick={sendToBucketList}
							size="sm"
						>
							Save
						</Button>
					</Center>
				</Box>
			</Box>
		</Center>
	);
}

export default HolidayCard;
