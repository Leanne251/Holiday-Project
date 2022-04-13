import React from 'react';
import { getAuth } from 'firebase/auth';

function HolidayCard({ holidayInfo }) {
	const auth = getAuth();
	const userID = auth.currentUser.uid;

	const sendObj = {
		user_id: userID,
		creation_date: new Date(),
		destination: holidayInfo.destination,
		style: holidayInfo.style,
		hotel: holidayInfo.hotel
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
		<div className="holidayCard">
			<div>
				<h4> {holidayInfo.destination}</h4>
				<p> {holidayInfo.style}</p>
				<p>{holidayInfo.hotel}</p>
				<button onClick={sendToBucketList}>Save to Bucket List</button>
			</div>
		</div>
	);
}

export default HolidayCard;
