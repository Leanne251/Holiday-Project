import { useEffect, useState } from 'react';
import HolidayCard from '../HolidayCard/HolidayCard';
import SearchBar from '../SearchBar/SearchBar';

function Dashboard({ token, userName }) {
	const [ dummyHolidays, setDummyHolidays ] = useState();

	useEffect(
		() => {
			if (token && userName) {
				() => {
					getDummyHolidays(token);
				};
			}
		},
		[ token, userName ]
	);

	async function getDummyHolidays() {
		const response = await fetch('http://localhost:5000/holidays', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		const data = await response.json();
		console.log('response from Dashboard', data);
		setDummyHolidays(data.payload);
	}

	console.log('dummyholidays', dummyHolidays);

	return (
		<div>
			<h3>{userName}, Your Adventure Awaits!</h3>
			<SearchBar token={token} setDummyHolidays={setDummyHolidays} />
			{dummyHolidays !== undefined ? (
				dummyHolidays.map((dummyHoliday) => (
					<div>
						<HolidayCard key={dummyHoliday.id} holidayInfo={dummyHoliday} />
					</div>
				))
			) : null}
		</div>
	);
}

export default Dashboard;

// Create a fetch request for ALL holidays
// use useEffect so the fetch request happens on load

// const fetchData = async (token) => {
// 	const res = await axios.get('http://localhost:5000/api/todos', {
// 		headers: {
// 			Authorization: 'Bearer ' + token
// 		}
// 	});
// 	console.log('res.data', res.data);
// };
