import{ combineReducers } from 'redux';
import { timeLenReducer } from '../components/input/inputDucks';
import { settingsReducer} from '../components/settings/settingsDucks';
import { countdownReducer } from '../components/timer/timerDucks';

const allReducers = combineReducers({
    time :  timeLenReducer,
    settings : settingsReducer,
    countdown : countdownReducer
});

export default allReducers;