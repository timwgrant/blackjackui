import React from 'react';
import '../App.css';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PlayerListForm from './PlayerListForm';
import HomePage from '../home/HomePage';
import GamePage from './GamePage';


function BlackjackGame() {
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
          <Route path="/players" element={<PlayerListForm />} />
          <Route path="/game" element={<GamePage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default BlackjackGame;
