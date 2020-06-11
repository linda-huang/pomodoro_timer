import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/timer/timer';
import Settings from './components/timer/settings/settings-modal-wrapper';
import { Provider } from 'react-redux';
import { store } from './reducers/store';

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Timer/>
        <Settings/>
      </Provider>
    </div>
  );
}

