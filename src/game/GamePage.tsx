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
        let cardCollection: Card[] = [
            await loadCard(aDealer.id),
            await loadCard(aDealer.id),
            // Add more cards as needed
        ];
        let playerComposite = new PlayerComposite({
            player: aDealer,
            cards: cardCollection,
        });
        setPlayerComposites(prevComposites => [...prevComposites, playerComposite]);


        let aPlayer = new Player({ name: 'Joe', isDealer: false });
        await savePlayer(aPlayer);
        cardCollection = [
            await loadCard(aPlayer.id),
            await loadCard(aPlayer.id),
            // Add more cards as needed
        ];
        playerComposite = new PlayerComposite({
            player: aPlayer,
            cards: cardCollection,
        });

        setPlayerComposites(prevComposites => [...prevComposites, playerComposite]);
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