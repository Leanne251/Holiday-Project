import { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { useContext } from 'react';
import { fireBaseWrapper } from '../../App';
import { Box, Button, Heading, Center, Input, FormControl, FormLabel } from '@chakra-ui/react';

// useReducer to reduce amout of useStates for the form?

function AddAHoliday() {
	let firebase = useContext(fireBaseWrapper);
	let userID = firebase.currentUser.uid;
	let authToken = sessionStorage.getItem('Auth Token');

	const [ previewSource, setPreviewSource ] = useState();
	const [ holidayData, setHolidayData ] = useState({
		userId: userID,
		destination: '',
		style: '',
		hotel: '',
		image: ''
	});

	function handleFileInput(e) {
		const file = e.target.files[0];
		previewFile(file);
	}

	function previewFile(file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
			setHolidayData({ ...holidayData, image: reader.result });
		};
	}

	function getFormData(e) {
		const value = e.target.value;
		setHolidayData({ ...holidayData, [e.target.name]: value });
	}

	console.log('holidayData', holidayData);

	function sendData(e) {
		console.log('hit');
		e.preventDefault();
		postData();
	}

	console.log('holiday Data1', holidayData);

	async function postData() {
		console.log('holiday data', holidayData);

		console.log('authToken from Add A Holiday', authToken);
		const response = await fetch('https://april-firebase.herokuapp.com/holidays', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authToken,
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(holidayData)
		});
		console.log(response);
		setPreviewSource();
	}

	return (
		<Box>
			<NavBar />
			<Box m={4}>
				<Center>
					<Heading as="h2" size="lg">
						Add A Holiday
					</Heading>
				</Center>
				<Heading as="h4" size="sm" p={4}>
					Had a great adventure? Share it with others!
				</Heading>
				<form onSubmit={sendData}>
					<FormLabel>Destination</FormLabel>
					<Input type="text" name="destination" value={holidayData.destination} onChange={getFormData} />
					<FormLabel>Style</FormLabel>
					<Input type="text" name="style" value={holidayData.style} onChange={getFormData} />
					<FormLabel>Hotel</FormLabel>
					<Input type="text" name="hotel" value={holidayData.hotel} onChange={getFormData} />
					<Input
						type="file"
						name="image"
						onChange={handleFileInput}
						value={(e) => e.target.files[0]}
						className="form-input"
					/>
					{previewSource && (
						<img src={previewSource} alt="preview of selection" style={{ height: '300px' }} />
					)}
					<button>Post</button>
				</form>
			</Box>
		</Box>
	);
}

// NEED TO IMPLEMENT FORMIK!!

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
