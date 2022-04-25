import { useEffect, useState } from 'react';
import HolidayCard from '../HolidayCard/HolidayCard';
import SearchBar from '../SearchBar/SearchBar';
import { Heading, SimpleGrid, Center, Box } from '@chakra-ui/react';
import LoginPage from '../LoginPage/LoginPage';

function Dashboard({ token, userName }) {
	const [ allHolidays, setAllHolidays ] = useState();

	useEffect(
		() => {
			if (token && userName) {
				async function fetchAllHolidays() {
					const response = await fetch('https://april-firebase.herokuapp.com/holidays', {
						headers: {
							Authorization: 'Bearer ' + token,
							'Access-Control-Allow-Origin': '*'
						}
					});
					const data = await response.json();
					console.log('response from Dashboard', data);
					setAllHolidays(data.payload);
				}
				fetchAllHolidays();
			}
		},
		[ token, userName ]
	);

	if (userName) {
		const display = userName.split(' ')[0];
		return (
			<Box w="100%" pos="relative">
				<Center>
					<Heading as="h2" p={4}>
						{display}, Your Adventure Awaits!
					</Heading>
				</Center>
				<SearchBar token={token} setAllHolidays={setAllHolidays} />

				<Center>
					<Box>
						<SimpleGrid columns={[ 1, 2, 4 ]} spacing="40px" p={4}>
							{allHolidays &&
								allHolidays.map((holiday) => <HolidayCard key={holiday.id} holidayInfo={holiday} />)}
						</SimpleGrid>
					</Box>
				</Center>
			</Box>
		);
	}
	return (
		<div>
			<p>Opps...something wen't wrong. Please try again to log in</p>
			<LoginPage />
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
