import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Player } from './model/Player';


interface PlayerFormProps {
  onSubmit: SubmitHandler<FormData>;
}

interface FormData{
    name: string;
    balance: number;
}

function PlayerForm({ onSubmit }: PlayerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(); // Specify the generic type for useForm

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      {errors.name && <p>Name is required.</p>}
      <input {...register('balance', { pattern: /\d+/ })} />
      {errors.balance && <p>Please enter a balance.</p>}
      <input type="submit" />
    </form>
  );
}

export default PlayerForm;
