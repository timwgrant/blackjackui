import React, { useEffect } from 'react';
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
        players.forEach(async (aPlayer) => {
            const card1 = await loadCard(aPlayer.id);
            const card2 = await loadCard(aPlayer.id);

            console.log(`Cards for player ${aPlayer.id}:`, card1, card2);
        });
        console.log(players);

    };

    const sortedPlayers = [...players].sort((a, b) => a.id - b.id);
    return (
        <>
            <div >
                <button
                    className=" hidden"
                    onClick={handleClick}
                >
                    <span className="icon-alert "></span>
                    player
                </button>
            </div>
            <div className="row">
                <button
                    className=" hidden"
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