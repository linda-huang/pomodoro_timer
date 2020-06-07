import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/timer/timer';
import Settings from './components/settings/settings-modal-wrapper';

export default function App() {
  return (
    <div>
      <Timer/>
      <Settings/>
    </div>
  );
}

