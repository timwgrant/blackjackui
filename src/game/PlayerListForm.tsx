import React, { useState } from 'react';
import PlayerForm from './PlayerForm';
import { SubmitHandler } from 'react-hook-form';

interface Player {
  name: string;
  balance: number;
}

function PlayerListForm() {
  const [players, setPlayers] = useState<Player[]>([]);

  const onSubmit: SubmitHandler<Player> = (data) => {
    console.log(data);
    setPlayers((prevPlayers) => [...prevPlayers, data]);
    // Do something with the submitted data
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