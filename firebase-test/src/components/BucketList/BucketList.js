import React, { useEffect, useState, useContext } from 'react';
import NavBar from '../NavBar/NavBar';
import { fireBaseWrapper } from '../../App';
import { Box, Heading, Center } from '@chakra-ui/react';

function BucketList() {
	const [ userHolidays, setUserHolidays ] = useState();
	const [ bucketListHolidays, setbucketListHolidays ] = useState();

	let firebase = useContext(fireBaseWrapper);
	let userID = firebase.currentUser.uid;

	const token = sessionStorage.getItem('Auth Token');
	console.log('token from bucket list', token);

	useEffect(
		() => {
			if (token && userID) {
				getSavedHolidays(userID, token);
				getMyHolidays(userID, token);
			}
		},
		[ token, userID ]
	);

	async function getMyHolidays(userID, token) {
		const response = await fetch(`https://april-firebase.herokuapp.com/holidays/${userID}`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		const data = await response.json();
		setUserHolidays(data.payload);
	}

	async function getSavedHolidays(userID, token) {
		const response = await fetch(`https://april-firebase.herokuapp.com/users/${userID}`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});

		const data = await response.json();
		console.log('data2', data);
		setbucketListHolidays(data.payload);
	}

	console.log('bucketListHolidays', bucketListHolidays);

	return (
		<Box>
			<NavBar />
			<Center>
				<Heading as="h2" size="lg" p={4} m={4}>
					Trip List
				</Heading>
			</Center>
			<Heading as="h4" size="md" p={4} m={4}>
				Trips I've Submitted
			</Heading>
			{userHolidays ? userHolidays.map((element) => <p>{element.destination}</p>) : null}
			<Heading as="h4" size="md" p={4} m={4} p={4} m={4}>
				Bucket List Trips
			</Heading>
			{bucketListHolidays ? bucketListHolidays.map((element) => <p>{element.destination}</p>) : null}
		</Box>
	);
}

export default BucketList;

// make a fetch request for only the users items.

// One fetch request for holidays they have added - FROM holidays table

// One fetch request for holidays saved by them - from userHolidays table
