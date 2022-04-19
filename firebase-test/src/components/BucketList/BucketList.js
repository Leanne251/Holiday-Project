import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

function BucketList() {
	const [ userHolidays, setUserHolidays ] = useState();
	const [ bucketListHolidays, setbucketListHolidays ] = useState();

	const auth = getAuth();
	const userID = auth.currentUser.uid;

	console.log('uid from bucket list', auth.currentUser.uid);
	const token = sessionStorage.getItem('Auth Token');
	console.log('token from bucket list', token);

	useEffect(
		() => {
			if (token && userID) {
				getMyHolidays(userID, token);
				getSavedHolidays(userID, token);
			}
		},
		[ token, userID ]
	);

	async function getMyHolidays(userID, token) {
		const response = await fetch(`http://localhost:5000/holidays/${userID}`, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		console.log('response', response);

		const data = await response.json();
		console.log('data', data);
		setUserHolidays(data.payload);
	}

	async function getSavedHolidays(userID, token) {
		const response = await fetch(`https://april-firebase.herokuapp.com/users/${userID}`, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		const data = await response.json();
		setbucketListHolidays(data.payload);
	}

	console.log('userHolidays', userHolidays);
	console.log('bucketListHolidays', bucketListHolidays);

	return (
		<div>
			<h2>Trip List</h2>
			<h4>Trips I've Submitted </h4>
			{userHolidays ? userHolidays.map((element) => <p>{element.destination}</p>) : null}
			<h4>Bucket List Trips</h4>
			{bucketListHolidays ? bucketListHolidays.map((element) => <p>{element.destination}</p>) : null}
		</div>
	);
}

export default BucketList;

// make a fetch request for only the users items.

// One fetch request for holidays they have added - FROM holidays table

// One fetch request for holidays saved by them - from userHolidays table
