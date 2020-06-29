import { createStore } from 'redux';
import allReducers from './reducers';

/**
 @constant
 @name store

 @description
 A Redux store that holds the complete state tree of the IntSys Frontend app.
*/
export const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

// export const persistor = persistStore(store);