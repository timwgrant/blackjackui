import React, { useEffect, useState } from 'react';
import { cardAPI } from './api/cardAPI';
import { Player } from './model/Player';
import PlayerDisplay from './PlayerDisplay';
import { PlayerComposite } from './model/PlayerComposite';


interface GamePageProps {
    players: Player[];
}

function GamePage({ players }: GamePageProps) {

    const [playerComposites, setPlayerComposites] = useState<PlayerComposite[]>([]);

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
            let newComposite = new PlayerComposite({player: aPlayer});
            newComposite.cards.push(await loadCard(aPlayer.id));
            newComposite.cards.push(await loadCard(aPlayer.id));
  

            console.log(`Cards for player ${aPlayer.id}:`, newComposite);
            
            setPlayerComposites(prevPlayerComposites => [...prevPlayerComposites, newComposite]);
        });
        console.log(players);

    };

    const sortedComposites = [...playerComposites].sort((a, b) => a.player.id - b.player.id);
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
                    className=" rounded"
                    onClick={initGame}
                >
                    <span className="icon-edit "></span>
                    Init Game
                </button>
            </div>
            <div>
                <>
                    <h1>Blackjack</h1>
                    {sortedComposites.map((aComposite) => (
                        <div key={aComposite.player.id} >
                            <PlayerDisplay
                                player={aComposite.player}
                                initialCards={aComposite.cards}
                                loadCard={loadCard} />
                        </div>
                    ))}
                </>
            </div>
        </>
    );
}

export default GamePage;