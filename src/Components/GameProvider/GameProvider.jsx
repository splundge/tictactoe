import React, { memo, useCallback, useEffect, useState } from 'react';
import { isNullOrUndefined } from '../Utils';
import {
	gameStates,
	getWinner,
	initializeRowColumns,
} from './GameProviderConstants';

const GameContext = React.createContext(undefined);

export const useGameContext = () => {
	const context = React.useContext(GameContext);
	if (context === undefined) {
		throw new Error('useGameContext must be used within a GameProvider');
	}
	return context;
};

const GameProvider = ({
	children,
	rowCount,
	columnCount,
	winCountCondition,
	players,
}) => {
	const [currentPlayer, setCurrentPlayer] = useState(players[0]);
	const [lastWinningPlayer, setLastWinningPlayer] = useState();
	const [gameState, setGameState] = useState(gameStates.stopped);
	const [rowCellValues, setRowCellValues] = useState([[]]);

	useEffect(() => {
		setRowCellValues(initializeRowColumns(rowCount, columnCount));
	}, [rowCount, columnCount]);

	useEffect(() => {
		if (gameState === gameStates.stopped) {
			return;
		}
		const winner = getWinner(rowCellValues, winCountCondition, players);
		if (!isNullOrUndefined(winner)) {
			setLastWinningPlayer(winner);
			setGameState(gameStates.stopped);
		}
	}, [
		gameState,
		winCountCondition,
		rowCellValues,
		setGameState,
		setLastWinningPlayer,
		setRowCellValues,
	]);

	const handleReset = useCallback(() => {
		setRowCellValues(initializeRowColumns(rowCount, columnCount));
		setGameState(gameStates.stopped);
		setCurrentPlayer(players[0]);
		setLastWinningPlayer(null);
	}, [rowCount, columnCount, setRowCellValues]);

	return (
		<GameContext.Provider
			value={{
				rowCellValues,
				setRowCellValues,
				players,
				currentPlayer,
				setCurrentPlayer,
				lastWinningPlayer,
				setLastWinningPlayer,
				gameState,
				setGameState,
				reset: handleReset,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default memo(GameProvider);
