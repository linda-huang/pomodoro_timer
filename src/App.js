import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/timer';
import UrlTracker from './components/url'

function App() {
  return (
    <div className="App">
      <Timer/>
      <UrlTracker/>
    </div>
  );
}

export default App;
