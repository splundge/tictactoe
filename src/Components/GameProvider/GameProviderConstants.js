import { arrayIsNullOrEmpty, isNullOrUndefined, repeat } from '../Utils';

/**
 * current state of the game
 */
export const gameStates = {
	stopped: 0,
	running: 1,
};

/**
 * gets the next player
 * @param {*} currentPlayer
 * @param {*} players
 * @returns
 */
export const getNextPlayer = (currentPlayer, players) => {
	if (arrayIsNullOrEmpty(players)) {
		throw new Error('No players');
	}

	if (isNullOrUndefined(currentPlayer)) {
		return players[0];
	}

	const index = players.findIndex((player) => player.id === currentPlayer.id);
	if (index === players.length - 1) {
		return players[0];
	}
	return players[index + 1];
};

/**
 * given a row and column count, this populates the game board
 * @param {*} columnCount
 * @param {*} rowCount
 * @returns [[]]
 */
export const initializeRowColumns = (columnCount, rowCount) =>
	repeat(columnCount, () => repeat(rowCount, () => null));

/**
 * given a collection of row cell values and players, this works out who the winner is
 * @param {aray} rowCellValues
 * 	[
 * 		['x',  'x',  'o'],
 * 		[null, null, 'o'],
 * 		['x', 'x',   null]
 * ]
 * @param {number} winCountCondition number of adjacent symbols required to win
 * @param {array} players [{ name: '', id: 1, symbol:'x' }]
 * @returns one player from the winners if they've won
 */
export const getWinner = (rowCellValues, winCountCondition, players) => {
	let verticalComboTracker = { symbol: null, count: 0 };
	let diagonalComboTracker = { symbol: null, count: 0 };

	for (let rowIndex = 0; rowIndex < rowCellValues.length; rowIndex++) {
		const row = rowCellValues[rowIndex];
		let horizontalComboTracker = { symbol: null, count: 0 };
		for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
			const cell = row[cellIndex];

			horizontalComboTracker = trackHorizontalCombo(
				cell,
				horizontalComboTracker
			);
			if (horizontalComboTracker.count >= winCountCondition) {
				return players.find(
					(player) => player.symbol === horizontalComboTracker.symbol
				);
			}

			verticalComboTracker = trackHorizontalCombo(cell, verticalComboTracker);
			if (verticalComboTracker.count >= winCountCondition) {
				return players.find(
					(player) => player.symbol === verticalComboTracker.symbol
				);
			}

			diagonalComboTracker = trackHorizontalCombo(cell, diagonalComboTracker);
			if (diagonalComboTracker.count >= winCountCondition) {
				return players.find(
					(player) => player.symbol === diagonalComboTracker.symbol
				);
			}
		}
	}

	return null;
};

const trackHorizontalCombo = (cell, { symbol, count }) => {
	if (isNullOrUndefined(cell)) {
		return {
			symbol: null,
			count: 0,
		};
	}

	return {
		symbol: cell,
		count: symbol === cell ? count + 1 : 1,
	};
};

const trackVerticalCombo = (cell, tracker) => {
	return { symbol: null, count: 0 };
};

const trackDiagonalCombo = (cell, tracker) => {
	return { symbol: null, count: 0 };
};
