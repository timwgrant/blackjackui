// PlayerFormList.jsx
import React, { useEffect } from 'react';
import { Player } from './model/Player';
import PlayerForm from './PlayerForm';


interface PlayerFormListProps {
    players: Player[];
    savePlayer: (player: Player) => Promise<Player>;
    setPlayers: React.Dispatch<React.SetStateAction<any>>;
}

function PlayerListForm({ players, savePlayer, setPlayers }: PlayerFormListProps) {
    const handleClick = () => {
        console.log({ players });
    };
    
    return (
        <>
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
        <div >
                <button
                    className=" rounded"
                    onClick={handleClick}
                >
                    <span className="icon-alert "></span>
                    player
                </button>
            </div>
        </>
    );
};

export default PlayerListForm;