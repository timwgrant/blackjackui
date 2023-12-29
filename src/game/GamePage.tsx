import React, { } from 'react';
import { cardAPI } from './api/cardAPI';
import { Player } from './model/Player';
import PlayerDisplay from './PlayerDisplay';


interface GamePageProps {
    players: Player[];
}

function GamePage({ players }: GamePageProps) {

    const loadCard = async (playerId: number) => {
        console.log(playerId);
        const aCard = await cardAPI.get(playerId);
        return aCard;
    };

    const handleClick = () => {
        console.log({ players });
    };

    const initGame = async () => {
  
         console.log(players);

    };

    const sortedPlayers = [...players].sort((a, b) => a.id - b.id);
    return (
        <>
            <div >
                <button
                    className=" bordered"
                    onClick={handleClick}
                >
                    <span className="icon-alert "></span>
                    player
                </button>
            </div>
            <div className="row">
                <button
                    className=" bordered"
                    onClick={initGame}
                >
                    <span className="icon-edit "></span>
                    Init Game
                </button>
            </div>
            <div>
                <>
                    <h1>Blackjack</h1>
                    {sortedPlayers.map((player) => (
                        <div key={player.id} >
                            <PlayerDisplay
                                player={player}
                                loadCard={loadCard} />
                        </div>
                    ))}
                </>
            </div>
        </>
    );
}

export default GamePage;