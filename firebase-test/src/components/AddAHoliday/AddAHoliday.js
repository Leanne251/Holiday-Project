import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import NavBar from '../NavBar/NavBar';
import { Button } from '@chakra-ui/react';
import GetImages from '../GetImages/GetImages';

// useReducer to reduce amout of useStates for the form?

function AddAHoliday() {
	const auth = getAuth();
	let userID = '';
	if (auth) {
		userID = auth.currentUser.uid;
	}
	let authToken = sessionStorage.getItem('Auth Token');

	const [ previewSource, setPreviewSource ] = useState();
	const [ fileInputState, setFileInputState ] = useState('');
	const [ selectedFile, setSelectedFile ] = useState('');

	function handleFileInput(e) {
		const file = e.target.files[0];
		previewFile(file);
	}

	function previewFile(file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	}

	function handleSubmitFile(e) {
		e.preventDefault();
		if (!previewSource) return;
		uploadImage(previewSource);
	}

	async function postData() {
		console.log('holiday data', holidayData);

		console.log('authToken from Add A Holiday', authToken);
		const response = await fetch('https://april-firebase.herokuapp.com/holidays', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authToken
			},
			body: JSON.stringify(holidayData)
		});
		console.log(response);
	}

	// previewSource is a base64EncodedImage type.
	async function uploadImage(previewSource) {
		try {
			const response = await fetch('https://april-firebase.herokuapp.com/upload', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + authToken
				},
				body: JSON.stringify({ data: previewSource })
			});
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	}

	const [ holidayData, setHolidayData ] = useState({
		user_id: userID,
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
		console.log('holiday data', holidayData);

		console.log('authToken from Add A Holiday', authToken);
		const response = await fetch('https://april-firebase.herokuapp.com/holidays', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authToken
			},
			body: JSON.stringify(holidayData)
		});
		console.log(response);
	}

	return (
		<div>
			<NavBar />
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

			<h1>Upload</h1>
			<form onSubmit={handleSubmitFile}>
				<input
					type="file"
					name="image"
					onChange={handleFileInput}
					value={fileInputState}
					className="form-input"
				/>
				<Button type="submit">Submit</Button>
			</form>
			{/* Can use && here instead of if */}
			{previewSource && <img src={previewSource} alt="chosen image" style={{ height: '300px' }} />}
			<GetImages />
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
