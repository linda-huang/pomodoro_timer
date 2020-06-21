import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import TimerWrapper from './components/timer/timer-wrapper';
import Settings from './components/settings/settings-modal-wrapper';
import Sprite from './components/css-animation/sprite';

export default function App() {
  return (
<<<<<<< HEAD
      <div>
        <Provider store={store}>

              <TimerWrapper/>
  
        </Provider>
      </div>
=======
    <div>
      <Provider store={store}>
          <div className="App">
          <TimerWrapper/>
          <Sprite/>
          </div>
      </Provider>
    </div>
>>>>>>> the_messy_amalgamation
  );
}

