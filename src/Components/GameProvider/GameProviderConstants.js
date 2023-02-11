import { arrayIsNullOrEmpty, isNullOrUndefined, repeat } from '../Utils';
// solution 1
import { winConditions, options} from '../AdditionalFunctions'
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

	for(let x = 0; x < players.length; x++){
		const currentPlayer = players[x];
		if(
			isHorizontalWinner(rowCellValues, winCountCondition, currentPlayer) ||
			isVerticalWinner(rowCellValues, winCountCondition, currentPlayer) ||
			isDiagonalWinner(rowCellValues, winCountCondition, currentPlayer)
		){
			return currentPlayer;
		}
	}

	return null;
}

/**
 * checks to see if the given player has n symbols in a row horizontally
 */
const isHorizontalWinner = (rowCellValues, winCountCondition, player) => {

	for(let rowIndex = 0; rowIndex < rowCellValues.length; rowIndex++){
		const row = rowCellValues[rowIndex];
		let counter = 0;
		for(let cellIndex = 0; cellIndex < row.length; cellIndex++){
			const cell = row[cellIndex];
			
			if(cell === player.symbol) {
				counter++;
			} else {
				counter = 0;
			}

			if(counter >= winCountCondition){
				return true;
			}
		}
	}

	return null;
};

/**
 * checks to see if the given player has n symbols in a row vertically
 */
const isVerticalWinner = (rowCellValues, winCountCondition, player) => {

	for(let rowIndex = 0; rowIndex < rowCellValues.length; rowIndex++){
		const row = rowCellValues[rowIndex];
		let counter = 0;
		let tempArray = []
		for(let cellIndex = 0; cellIndex < row.length; cellIndex++){
			const cell = row[cellIndex];	
			if(cell === player.symbol) {
				counter++;
				tempArray.push(row)
				console.log(tempArray)
			};

			if(counter >= winCountCondition){
				return true;
			}
		}
	}

	return null;
};

/**
 * checks to see if the given player has n symbols in a row diagonally
 */
const isDiagonalWinner = (rowCellValues, winCountCondition, player) => {
	return false;
};








