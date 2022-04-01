import { useState, useEffect } from 'react';
import axios from 'axios';

function ListOfTodo({ token }) {
	useEffect(
		() => {
			if (token) {
				fetchData(token);
			}
		},
		[ token ]
	);

	const fetchData = async (token) => {
		const res = await axios.get('http://localhost:5000/api/todos', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		console.log('res.data', res.data);
	};

	return <h1>List Of Todo</h1>;
}

export default ListOfTodo;
