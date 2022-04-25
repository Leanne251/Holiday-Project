import { useState } from 'react';
import HolidayCard from '../HolidayCard/HolidayCard';
import { Select, Button, Box, Heading, Center, VStack } from '@chakra-ui/react';

function SearchBar({ setAllHolidays, token }) {
	const [ searchTerm, setSearchTerm ] = useState();
	const [ returnedSearchTerm, setReturnedSearchTerm ] = useState();

	function searchForHoliday() {
		setAllHolidays(undefined);
		searchHolidays(searchTerm);
	}

	async function searchHolidays() {
		const response = await fetch(`http://localhost:5000/holidays?destination=${searchTerm}`, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		const data = await response.json();
		setReturnedSearchTerm(data.payload);
	}

	return (
		<Box>
			<Box ml={5} w="400px" maxWidth="90%" border="1px black solid" p={4}>
				<Heading as="h4" size="md">
					Search for a destination
				</Heading>

				<Select m={2} width="350px" maxWidth="100%" onChange={(e) => setSearchTerm(e.target.value)}>
					<option value="blank" />
					<option value="Ibiza">Ibiza</option>
					<option value="Thailand">Thailand</option>
					<option value="California">California</option>
				</Select>
				{/* <input type="text" placeholder="destination" onChange={(e) => setSearchTerm(e.target.value)} /> */}
				<Button m={2} size="md" p={2} onClick={searchForHoliday}>
					Search
				</Button>
			</Box>
			<Box>
				{returnedSearchTerm ? (
					returnedSearchTerm.map((element) => <HolidayCard m={4} holidayInfo={element} />)
				) : (
					<div />
				)}
			</Box>
		</Box>
	);
}

export default SearchBar;

// When you click search I need to run a query on the data
// It will fetch that destination and display it.
// all other destinations need to disappear.
// conditional rendering - set dummyHolidays back to undefined.
// just map over the new fetched data.
