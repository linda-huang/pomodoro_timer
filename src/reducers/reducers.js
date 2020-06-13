import{combineReducers} from 'redux';
import {pomodoroReducer} from '../components/timer/timerDucks';

const allReducers = combineReducers({
    workBreakSettings : pomodoroReducer
});

export default allReducers;