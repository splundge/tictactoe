import React, { useCallback } from 'react';
import { useGameContext } from '../GameProvider/GameProvider';
import {
	gameStates,
	getNextPlayer,
} from '../GameProvider/GameProviderConstants';
import Tile from '../Tile/Tile';
import { isNullOrUndefined } from '../Utils';
import './Board.scss';

const Board = () => {
	const {
		players,
		rowCellValues,
		setRowCellValues,
		setCurrentPlayer,
		currentPlayer,
		gameState,
	} = useGameContext();

	const handleTileClick = useCallback(
		(rowIndex, cellIndex) => {
			if (
				gameState === gameStates.stopped ||
				!isNullOrUndefined(rowCellValues[rowIndex][cellIndex])
			) {
				return;
			}
			setRowCellValues((prev) => {
				const updated = [...prev];
				updated[rowIndex][cellIndex] = currentPlayer.symbol;
				return updated;
			});
			setCurrentPlayer((previousCurrentPlayer) =>
				getNextPlayer(previousCurrentPlayer, players)
			);
		},
		[
			gameState,
			rowCellValues,
			setRowCellValues,
			players,
			setCurrentPlayer,
			currentPlayer,
		]
	);

	const renderCell = useCallback(
		(cellValue, rowIndex, cellIndex) => {
			return (
				<div className="board__row__cell" key={`cell_${cellIndex}`}>
					<Tile
						value={cellValue}
						onClick={() => handleTileClick(rowIndex, cellIndex)}
					/>
				</div>
			);
		},
		[handleTileClick]
	);

	const renderRow = useCallback(
		(cellValues, rowIndex) => {
			return (
				<div className="board__row" key={`row_${rowIndex}`}>
					{cellValues.map((cellValue, cellIndex) =>
						renderCell(cellValue, rowIndex, cellIndex)
					)}
				</div>
			);
		},
		[renderCell]
	);

	return (
		<div
			className={`board board--${
				gameState === gameStates.stopped ? 'stopped' : 'running'
			}`}
		>
			{rowCellValues.map(renderRow)}
		</div>
	);
};

export default Board;
