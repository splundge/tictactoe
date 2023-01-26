import React from 'react';
import './Tile.scss';

const Tile = ({ value, onClick }) => {
	const hasValue = (value || '').length > 0;
	return (
		<div className={`tile ${!hasValue ? 'tile--empty' : ''}`} onClick={onClick}>
			<div className="tile__value">{value}</div>
		</div>
	);
};

export default Tile;
