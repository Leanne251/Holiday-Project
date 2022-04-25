import { useEffect, useState } from 'react';
import HolidayCard from '../HolidayCard/HolidayCard';
import SearchBar from '../SearchBar/SearchBar';
import { Heading, SimpleGrid, Center, Container, Box } from '@chakra-ui/react';

function Dashboard({ token, userName }) {
	const [ allHolidays, setAllHolidays ] = useState();

	useEffect(
		() => {
			if (token && userName) {
				fetchAllHolidays(token);
			}
		},
		[ token, userName ]
	);

	async function fetchAllHolidays() {
		const response = await fetch('http://localhost:5000/holidays', {
			headers: {
				Authorization: 'Bearer ' + token,
				'Access-Control-Allow-Origin': '*'
			}
		});
		const data = await response.json();
		console.log('response from Dashboard', data);
		setAllHolidays(data.payload);
	}

	console.log('dummyholidays', setAllHolidays);

	return (
		<Box w="100%" pos="relative">
			<Heading as="h2">{userName}, Your Adventure Awaits!</Heading>
			<SearchBar token={token} allHolidays={allHolidays} />

			<Center>
				<Box>
					<SimpleGrid columns={[ 1, 4, 6 ]} spacing="40px">
						{allHolidays &&
							allHolidays.map((holiday) => <HolidayCard key={holiday.id} holidayInfo={holiday} />)}
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
