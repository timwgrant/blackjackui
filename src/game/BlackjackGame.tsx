import React, { useState } from 'react';
import '../App.css';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PlayerListForm from './PlayerListForm';
import HomePage from '../home/HomePage';
import GamePage from './GamePage';
import { Player } from './model/Player';
import { playerApi } from './api/playerAPI';


function BlackjackGame() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

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

    return (
        <Router>
            <header className="sticky">
                <span className="logo">
                    <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
                </span>
                <NavLink to="/" className="button rounded">
                    <span className="icon-home"></span>
                    Home
                </NavLink>
                <NavLink to="/players" className="button rounded">
                    Players
                </NavLink>
                <NavLink to="/game" className="button rounded">
                    Game
                </NavLink>

            </header>
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/players" element={<PlayerListForm savePlayer={savePlayer} players={players} setPlayers={setPlayers}  />} />
                    <Route path="/game" element={<GamePage players={players} />} />

                </Routes>
            </div>
        </Router>
    );
}

export default BlackjackGame;
