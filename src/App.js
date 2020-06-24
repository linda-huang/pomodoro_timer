import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import TimerWrapper from './components/timer/timer-wrapper';

export default function App() {
  return (
      <div>
        <Provider store={store}>

              <TimerWrapper/>
  
        </Provider>
      </div>
  );
}

