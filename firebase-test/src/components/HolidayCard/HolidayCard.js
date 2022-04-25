import { useContext } from 'react';
import { fireBaseWrapper } from '../../App';
import { Box, Image, Badge, Button } from '@chakra-ui/react';

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
		postData();
	}

	async function postData() {
		console.log('sendObj', sendObj);
		let authToken = sessionStorage.getItem('Auth Token');
		console.log('authToken from HolidayCard', authToken);
		const response = await fetch('http://localhost:5000/users/', {
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
		<Box maxW="md" borderWidth="2px" borderRadius="lg" overflow="hidden">
			<Image />

			<Box p="6">
				<Box display="flex" alignItems="baseline">
					<Badge borderRadius="full" px="2" colorScheme="teal">
						New
					</Badge>
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="xs"
						textTransform="uppercase"
						ml="2"
					>
						Luxury Stay!
					</Box>
				</Box>
				<img src={holidayInfo.image_url} alt={holidayInfo.destination} />
				<h4> {holidayInfo.destination}</h4>
				<p> {holidayInfo.style}</p>
				<p>{holidayInfo.hotel}</p>
				<Button onClick={sendToBucketList}>Save to Bucket List</Button>
			</Box>
		</Box>
	);
}

export default HolidayCard;
