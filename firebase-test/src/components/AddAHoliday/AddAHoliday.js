import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import NavBar from '../NavBar/NavBar';
import { useContext } from 'react';
import { fireBaseWrapper } from '../../App';

// useReducer to reduce amout of useStates for the form?

function AddAHoliday() {
	let firebase = useContext(fireBaseWrapper);

	let userID = firebase.currentUser.uid;

	let authToken = sessionStorage.getItem('Auth Token');

	const [ previewSource, setPreviewSource ] = useState();
	const [ fileInputState, setFileInputState ] = useState('');
	// const [ selectedFile, setSelectedFile ] = useState('');
	const [ holidayData, setHolidayData ] = useState({
		user_id: userID,
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
		e.preventDefault();
		postData();
	}

	console.log('holiday Data1', holidayData);

	async function postData() {
		console.log('holiday data', holidayData);

		console.log('authToken from Add A Holiday', authToken);
		const response = await fetch('http://localhost:5000/holidays', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authToken
			},
			body: JSON.stringify(holidayData)
		});
		console.log(response);
		setPreviewSource();
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
				<input
					type="file"
					name="image"
					onChange={handleFileInput}
					value={fileInputState}
					className="form-input"
				/>
				{previewSource && <img src={previewSource} alt="chosen image" style={{ height: '300px' }} />}
				<button>Post</button>
			</form>

			{/* <h1>Upload</h1>
			<form onSubmit={handleSubmitFile}>
				<input
					type="file"
					name="image"
					onChange={handleFileInput}
					value={fileInputState}
					className="form-input"
				/>
				<Button type="submit">Submit</Button>
			</form> */}
			{/* Can use && here instead of if */}
			{/* {previewSource && <img src={previewSource} alt="chosen image" style={{ height: '300px' }} />} */}
			{/* <GetImages /> */}
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
