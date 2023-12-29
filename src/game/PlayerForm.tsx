// PlayerForm.jsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Player } from './model/Player';


interface PlayerFormProps {
  savePlayer: (player: Player) => Promise<Player>;
  setPlayers: React.Dispatch<React.SetStateAction<any>>;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ savePlayer, setPlayers }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Player>();

  const onSubmit: SubmitHandler<Player> = async (data) => {
    try {
      console.log(data);
      const savedPlayer = await savePlayer(data);
      setPlayers((prevPlayers: any) => [...prevPlayers, savedPlayer]);
      //const savedPlayer = await savePlayer(data);
      //console.log('Player saved:', savedPlayer);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p>{errors.name.message}</p>}
      </label>
      <br />
      <label>
        Balance:
        <input {...register('balance', { required: 'Balance is required', valueAsNumber: true })} />
        {errors.balance && <p>{errors.balance.message}</p>}
      </label>
      <br />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default PlayerForm;