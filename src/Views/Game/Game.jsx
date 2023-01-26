import React from 'react';
import Board from '../../Components/Board/Board';
import GameProvider from '../../Components/GameProvider/GameProvider';
import GameInfo from './GameInfo';
import GameToolbar from './GameToolbar';
import './Game.scss';

const Game = () => {
	return (
		<div className="game">
			<Board columnCount={3} rowCount={3} />
			<GameInfo />
			<GameToolbar />
		</div>
	);
};

/**
 * wraps the game in a game provider so that we can use the context
 * @param {*} props
 * @returns
 */
const GameWrapper = () => (
	<GameProvider
		winCountCondition={3}
		columnCount={9}
		rowCount={3}
		players={[
			{ id: 1, name: 'Bob', symbol: 'X' },
			{ id: 2, name: 'Sarah', symbol: 'O' },
		]}
	>
		<Game />
	</GameProvider>
);

export default GameWrapper;
