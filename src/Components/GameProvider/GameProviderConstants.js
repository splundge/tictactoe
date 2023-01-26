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
	/*
		todo: find a winner horizontally, vertically, diagonally!
		const winner = players[0];
		return winner;
	*/
	return null;
};
