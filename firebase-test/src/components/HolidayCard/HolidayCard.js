import React from 'react';

function HolidayCard({ holidayInfo }) {
	return (
		<div className="holidayCard">
			<div>
				<h4> {holidayInfo.destination}</h4>
				<p> {holidayInfo.style}</p>
				<p>{holidayInfo.hotel}</p>
			</div>
		</div>
	);
}

export default HolidayCard;
