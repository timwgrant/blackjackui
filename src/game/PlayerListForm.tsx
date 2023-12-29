// PlayerFormList.jsx
import React from 'react';
import { Player } from './model/Player';
import PlayerForm from './PlayerForm';


interface PlayerFormListProps {
    players: Player[];
    savePlayer: (player: Player) => Promise<Player>;
    setPlayers: React.Dispatch<React.SetStateAction<any>>;
}

const PlayerListForm: React.FC<PlayerFormListProps> = ({ players,  savePlayer, setPlayers}) => {
    return (
        <div>
            <PlayerForm savePlayer={savePlayer} setPlayers={setPlayers } />
            <h2>Player List</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        {player.name} - Balance: {player.balance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerListForm;