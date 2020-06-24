import React, {useLayoutEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import TimerWrapper from './components/timer/timer-wrapper';

export default function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight); 

  function updateSize (){
    if (window.outerHeight < 300){
      window.resizeTo(window.outerWidth, 300);
    }
    if (window.outerWidth < 300){
      window.resizeTo(300, window.outerHeight);
    }
  };

  useLayoutEffect(()=> {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  });

  return (
      <div>
        <Provider store={store}>

              <TimerWrapper/>
  
        </Provider>
      </div>
  );
}

