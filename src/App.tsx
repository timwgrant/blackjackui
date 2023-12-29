import React from 'react';
import GamePage from './game/GamePage';
import HomePage from './home/HomePage';
import './App.css';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PlayerForm from './game/PlayerForm';
import PlayerListForm from './game/PlayerListForm';
import BlackjackGame from './game/BlackjackGame';

function App() {
  return (
    <div>
      <BlackjackGame/>
    </div>
  );
}

export default App;
