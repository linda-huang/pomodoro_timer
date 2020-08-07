import { combineReducers } from 'redux';
import { timeLenReducer } from '../components/input/inputDucks';
import { settingsReducer} from '../components/settings/settingsDucks';
import { countdownReducer } from '../components/timer/timerDucks';
import { animationReducer } from '../components/animation/animationDucks';

const allReducers = combineReducers({
    time :  timeLenReducer,
    settings : settingsReducer,
    countdown : countdownReducer,
    animation: animationReducer,
});

export default allReducers;