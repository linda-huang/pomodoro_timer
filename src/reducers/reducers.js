import{ combineReducers } from 'redux';
import { breakLenReducer, workLenReducer } from '../components/input/inputDucks';
import { settingsReducer} from '../components/settings/settingsDucks';
import { countdownReducer } from '../components/timer/timerDucks';

const allReducers = combineReducers({
    workLength : workLenReducer,
    breakLength : breakLenReducer,
    settings : settingsReducer,
    countdown : countdownReducer
});

export default allReducers;