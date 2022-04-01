import { useState } from 'react';
import HolidayCard from '../HolidayCard/HolidayCard';

function SearchBar({ setDummyHolidays, token }) {
	const [ searchTerm, setSearchTerm ] = useState();
	const [ returnedSearchTerm, setReturnedSearchTerm ] = useState();

	function searchForHoliday() {
		setDummyHolidays(undefined);
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
		<div>
			<label>Search for a destination</label>
			<br />
			<select onChange={(e) => setSearchTerm(e.target.value)}>
				<option value="Ibiza">Ibiza</option>
				<option value="Thailand">Thailand</option>
				<option value="California">California</option>
			</select>
			{/* <input type="text" placeholder="destination" onChange={(e) => setSearchTerm(e.target.value)} /> */}
			<button onClick={searchForHoliday}>Search</button>
			{returnedSearchTerm ? returnedSearchTerm.map((element) => <HolidayCard holidayInfo={element} />) : <div />}
		</div>
	);
}

export default SearchBar;

// When you click search I need to run a query on the data
// It will fetch that destination and display it.
// all other destinations need to disappear.
// conditional rendering - set dummyHolidays back to undefined.
// just map over the new fetched data.
