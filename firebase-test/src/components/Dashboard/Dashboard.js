import { useEffect, useState } from 'react';
import HolidayCard from '../HolidayCard/HolidayCard';
import SearchBar from '../SearchBar/SearchBar';
import { Heading, SimpleGrid, Center, Container, Box } from '@chakra-ui/react';

function Dashboard({ token, userName }) {
	const [ dummyHolidays, setDummyHolidays ] = useState();

	useEffect(
		() => {
			if (token && userName) {
				getDummyHolidays(token);
			}
		},
		[ token, userName ]
	);

	async function getDummyHolidays() {
		const response = await fetch('https://april-firebase.herokuapp.com/holidays', {
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
		<Box w="100%">
			<Heading as="h2" size="md">
				{userName}, Your Adventure Awaits!
			</Heading>
			<SearchBar token={token} setDummyHolidays={setDummyHolidays} />

			<Center>
				<Box>
					<SimpleGrid columns={[ 1, 4, 6 ]} spacing="40px">
						{dummyHolidays !== undefined ? (
							dummyHolidays.map((dummyHoliday) => (
								<HolidayCard key={dummyHoliday.id} holidayInfo={dummyHoliday} />
							))
						) : null}
					</SimpleGrid>
				</Box>
			</Center>
		</Box>
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
