import React, { useCallback } from 'react';
import { useGameContext } from '../../Components/GameProvider/GameProvider';
import { gameStates } from '../../Components/GameProvider/GameProviderConstants';
import './GameToolbar.scss';

const GameToolbar = () => {
	const { gameState, setGameState, reset } = useGameContext();

	const handleReset = useCallback(() => {
		reset();
	}, [reset]);

	const handleStart = useCallback(() => {
		reset();
		setGameState(gameStates.running);
	}, [setGameState]);

	if (gameState === gameStates.running) {
		return (
			<div className="game-toolbar">
				<button onClick={handleReset}>reset</button>
			</div>
		);
	}

	return (
		<div className="game-toolbar">
			<button onClick={handleStart}>start</button>
		</div>
	);
};

export default GameToolbar;
