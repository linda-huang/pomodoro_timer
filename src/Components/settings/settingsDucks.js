/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const NUM_REPEATS = 'NUM_REPEATS';
const ALERT_SOUND = 'ALERT_SOUND';
const WORK_MUSIC = 'WORK_MUSIC';
const BREAK_MUSIC = 'BREAK_MUSIC';

/**
 * @constant setBreakMin
 * a redux action defined to be called in the pomodoroReducer to define break_length
 */

export const setNumRepeats = num_repeats => (
    {
        type: NUM_REPEATS,
        num_repeats
    }
)

export const setAlertSound = state => (
    {
        type: ALERT_SOUND,
        state
    }
)

export const setWorkMusic = state => (
    {
        type: WORK_MUSIC,
        state
    }
)

export const setBreakMusic = state => (
    {
        type: BREAK_MUSIC,
        state
    }
)
 /**
 * @constant initialPomodoroState
 * a intial state for the pomodoroReducer that indicates 25 min work and 5 min break
 */

const initialSettings = {
    num_repeats : 0,
    alert_sound : true,
    work_music : true,
    break_music : true,
}


/**
 * @function repeatsReducer
 * A reducer that takes in a current PomodoroState and actions and returns a new state which 
 * indicates the current break_length and work_length
 * 
 * @param {constant} state 
 * A redux state with fields break_length and work_length
 * 
 * @param {constant} action 
 * An action is triggered when being dispatched
 * 
 * @description
 * This pomodoroReducer updates the current break length and work length
 */

export function settingsReducer (state = initialSettings, action) {
    switch (action.type) {
        case NUM_REPEATS:
            return Object.assign({}, state, {
                num_repeats : action.num_repeats
            })
        case ALERT_SOUND:
            return Object.assign({}, state, {
                alert_sound : action.state
            })
        case WORK_MUSIC:
            return Object.assign({}, state, {
                work_music: action.state
            })
        case BREAK_MUSIC:
            return Object.assign({}, state, {
                break_music: action.state
            })
        default:
            return state
    }
}
