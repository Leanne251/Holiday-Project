import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<div>
			<ul>
				<Link to="/">
					<li>Home</li>
				</Link>
				<Link to="/addaholiday">
					<li>Add A Holiday</li>
				</Link>
				<Link to="/bucketlist">
					<li>My Bucket List</li>
				</Link>
			</ul>
		</div>
	);
}

export default NavBar;
