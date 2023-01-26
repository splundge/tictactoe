import React from 'react';
import { useGameContext } from '../../Components/GameProvider/GameProvider';
import { gameStates } from '../../Components/GameProvider/GameProviderConstants';
import { isNullOrUndefined } from '../../Components/Utils';
import './GameInfo.scss';

const GameInfo = () => {
	const { currentPlayer, lastWinningPlayer, gameState } = useGameContext();

	if (gameState === gameStates.running) {
		return (
			<div className="game-info">
				{currentPlayer.name}'s turn ({currentPlayer.symbol})
			</div>
		);
	}

	if (!isNullOrUndefined(lastWinningPlayer)) {
		return <div className="game-info">{lastWinningPlayer.name} wins!</div>;
	}

	return <div className="game-info">Hit 'start' to begin the game</div>;
};

export default GameInfo;
