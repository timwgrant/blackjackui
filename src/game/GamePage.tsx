import React, { useState, useEffect, } from 'react';
import CardsList from './CardsList';
import { cardAPI } from './api/cardAPI';
import { Card } from './model/Card';
import { Player } from './model/Player';
import { playerApi } from './api/playerAPI';
import PlayerDisplay from './PlayerDisplay';
import { PlayerComposite } from './model/PlayerComposite';

function GamePage(props: any) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerComposites, setPlayerComposites] = useState<PlayerComposite[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    const loadCard = async (playerId: number) => {
        console.log(playerId);
        const aCard = await cardAPI.get(playerId);
        return aCard;
    };

    const handleClick = () => {
        console.log({ playerComposites });
    };

    const savePlayer = async (player: Player): Promise<Player> => {

        return playerApi
            .put(player)
            .then(updatedPlayer => {
                handleUpdatePlayer(updatedPlayer);
                console.log('Player updated:', updatedPlayer);
                return updatedPlayer; // Return the updated player
            })
            .catch(error => {
                console.error('Error updating player:', error);
                throw error; // Rethrow the error to propagate it to the caller
            });
    };

    const handleUpdatePlayer = (updatedPlayer: Player) => {
        const playerIndex = players.findIndex(p => p.id === updatedPlayer.id);

        if (playerIndex === -1) {
            setPlayers(prevPlayers => [...prevPlayers, updatedPlayer]);
            const playerComposite = new PlayerComposite({
                player: updatedPlayer
            });
    
            setPlayerComposites(prevComposites => [...prevComposites, playerComposite]);
        } else {
            setPlayers(prevPlayers => {
                const updatedPlayers = [...prevPlayers];
                updatedPlayers[playerIndex] = updatedPlayer;
                return updatedPlayers;
            });
        }
    };

    const initGame = async () => {
        let aDealer = new Player({ name: 'Dealer', isDealer: true });
        await savePlayer(aDealer);

        let aPlayer = new Player({ name: 'Joe', isDealer: false });
        await savePlayer(aPlayer);

        console.log('playerComposites');
        console.log(playerComposites);

    };

    const sortedPlayers = [...playerComposites].sort((a, b) => a.player.id - b.player.id);
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
                        <div key={player.player.id} >
                            <PlayerDisplay
                                player={player.player}
                                loadCard={loadCard} />
                        </div>
                    ))}
                </>
            </div>
        </>
    );
}

export default GamePage;