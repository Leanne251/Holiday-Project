import { useState } from 'react';

// useReducer to reduce amout of useStates for the form?

function AddAHoliday() {
	const [ holidayData, setHolidayData ] = useState({
		user_id: 1,
		destination: '',
		style: '',
		hotel: ''
	});

	function getFormData(e) {
		const value = e.target.value;
		setHolidayData({ ...holidayData, [e.target.name]: value });
	}

	console.log('holidayData', holidayData);

	function sendData(e) {
		e.preventDefault();
		postData();
	}

	async function postData() {
		let authToken = sessionStorage.getItem('Auth Token');
		console.log('authToken from Add A Holiday', authToken);
		const response = await fetch('http://localhost:5000/holidays/', {
			method: 'POST',
			mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authToken
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(holidayData) // body data type must match "Content-Type" header});
		});
		console.log('response from post page', response);
	}

	return (
		<div>
			<h3>Add A Holiday</h3>
			<h4>Had a great adventure? Share it with others!</h4>
			<form onSubmit={sendData}>
				<label>Destination</label>
				<input type="text" name="destination" value={holidayData.destination} onChange={getFormData} />
				<label>Style</label>
				<input type="text" name="style" value={holidayData.style} onChange={getFormData} />
				<label>Hotel</label>
				<input type="text" name="hotel" value={holidayData.hotel} onChange={getFormData} />
				<button>Post</button>
			</form>
		</div>
	);
}

export default AddAHoliday;

// create a post request so the use can add a holiday to the database.
// INSERT INTO

// const [ input, setInput ] = useState({ one: '', two: '', three: '' });
// const [ getRecipes, setGetRecipes ] = useState();

// function getInput(e) {
// 	const value = e.target.value;
// 	console.log('value', value);
// 	setInput({ ...input, [e.target.name]: value });
// }
// console.log('input', input);

// function getRecipeButtons(e) {
// 	e.preventDefault();
// 	fetchTheRecipes();
// }

// <label>Ingredient One:</label>
// 				<input type="text" name="one" value={input.one} onChange={getInput} />
// 				<label>Ingredient Two:</label>
// 				<input type="text" name="two" value={input.two} onChange={getInput} />

// 				<label>Ingredient Three:</label>
// 				<input type="text" name="three" value={input.three} onChange={getInput} />
