import { useEffect, useState } from 'react';

function GetImages() {
	const [ imageIDs, setImagesIDs ] = useState();

	const loadImages = async () => {
		let authToken = sessionStorage.getItem('Auth Token');

		try {
			const res = await fetch('https://april-firebase.herokuapp.com/images', {
				headers: {
					Authorization: 'Bearer ' + authToken
				}
			});
			const data = await res.json();
			console.log('data', data);
			setImagesIDs(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadImages();
	}, []);

	return <div>GetImages</div>;
}

export default GetImages;
