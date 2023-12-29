import React from 'react';
import PlayerForm from './PlayerForm';
import { SubmitHandler } from 'react-hook-form';
import { Player } from './model/Player';


interface PlayerListFormProps{
    savePlayer: (player: Player) => Promise<Player>;
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

function PlayerListForm({ savePlayer, players, setPlayers }:  PlayerListFormProps) {


    const onSubmit: SubmitHandler<{ name: string; balance: number }> = (data) => {
        const newPlayer = new Player(data);
  
    console.log('data ' + data);
    console.log(data);
    savePlayer(newPlayer);

  };

  return (
    <div>
      <h1>Add Players</h1>
      <PlayerForm onSubmit={onSubmit} />
      <h2>Players List</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name} (Balance : ${player.balance})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerListForm;